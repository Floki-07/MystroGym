from flask import Flask, request, render_template, jsonify, session, redirect, url_for
from textblob import TextBlob
from pymongo import MongoClient
from datetime import datetime
import nltk
import re
import json
from bson.json_util import dumps
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import pandas as pd

nltk.download('punkt')
nltk.download('stopwords')
from nltk.corpus import stopwords

app = Flask(__name__)
app.secret_key = 'supersecretkey'

# DB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["feedbackDB"]
collection = db["feedbacks"]

# Helper functions
def clean_text(text):
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = text.lower()
    text = " ".join([word for word in text.split() if word not in stopwords.words('english')])
    return text

def get_sentiment_polarity(text):
    analysis = TextBlob(text)
    return analysis.sentiment.polarity

def get_sentiment_label(polarity):
    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    else:
        return "Neutral"

def get_category_tag(texts):
    tfidf = TfidfVectorizer(max_features=100)
    X = tfidf.fit_transform(texts)
    kmeans = KMeans(n_clusters=3, random_state=0, n_init='auto')
    return kmeans.fit_predict(X)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == 'admin' and password == 'admin':
            session['logged_in'] = True
            return redirect(url_for('dashboard'))
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template("dashboard.html")

@app.route("/submit", methods=["POST"])
def submit_feedback():
    data = request.json
    raw_message = data.get("message", "")
    cleaned = clean_text(raw_message)
    polarity = get_sentiment_polarity(cleaned)
    sentiment = get_sentiment_label(polarity)

    entry = {
        "raw_message": raw_message,
        "cleaned_message": cleaned,
        "sentiment": sentiment,
        "polarity": polarity,
        "timestamp": datetime.utcnow()
    }
    collection.insert_one(entry)
    return jsonify({"sentiment": sentiment, "polarity": polarity})

@app.route("/feedbacks")
def get_feedbacks():
    feedbacks = list(collection.find({}, {"_id": 0}))
    return dumps(feedbacks)

@app.route("/categorize")
def categorize_feedback():
    data = list(collection.find({}, {"_id": 0, "cleaned_message": 1}))
    df = pd.DataFrame(data)
    if df.empty:
        return jsonify([])
    tags = get_category_tag(df['cleaned_message'])
    for i, tag in enumerate(tags):
        collection.update_one({"cleaned_message": df.iloc[i]['cleaned_message']}, {"$set": {"category": f"Topic {tag+1}"}})
    return jsonify({"status": "categorized"})


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('home'))

if __name__ == "__main__":
    app.run(debug=True)