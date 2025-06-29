# 🏋️‍♂️ MystroGym – Smart Gym Feedback Analysis Platform

MystroGym is an intelligent feedback collection and analysis platform built for gyms and fitness centers. It enables **anonymous feedback submission** by users and provides the admin with a data-driven dashboard to analyze responses using **Data Science and NLP techniques** like **Sentiment Analysis**, **Keyword Extraction**, and **Trend Detection**.

## 🚀 Features

### 🧠 Data Science & Analytics
- 🔍 **Sentiment Analysis** on user feedback (Positive, Neutral, Negative)
- 📈 **Trend analysis** on commonly mentioned keywords/topics
- 📊 **Feedback statistics dashboard**: average rating, sentiment distribution, word frequency
- 📥 Export analyzed feedback as Excel/CSV/JSON data for further reporting

### 🌐 Web Platform
- 📝 Anonymous feedback submission form (user-friendly UI)
- 🔐 Admin login portal
- 📊 Admin dashboard with dynamic charts and tables
- 💡 Feedback stored in a MongoDB database and processed using Python

---

## 🛠️ Tech Stack

### 💻 Frontend
- HTML, CSS, JavaScript  
- Simple, responsive UI for feedback submission and admin dashboard

### 🔙 Backend
- **Python Flask** – Routing, API, integration with ML models
- **MongoDB** – Feedback data storage
- **Pandas / NumPy** – Data manipulation and aggregation
- **NLTK / TextBlob** – Sentiment Analysis
- **Matplotlib / Seaborn / WordCloud** – Data visualization

---

## 📂 Project Structure

```

MystroGym/
├── static/                # CSS, JS files
├── templates/             # HTML templates (Jinja2)
├── data/                  # CSV files for exported feedback (optional)
├── model/                 # ML/NLP scripts for analysis
│   ├── sentiment.py
│   ├── keyword\_extraction.py
│   └── visualization.py
├── app.py                 # Flask main app
├── requirements.txt
└── README.md

````

---

## 📊 Workflow

1. **Data Collection**  
   > Collected anonymously through a web form.

2. **Data Preprocessing**  
   > Cleaned, tokenized, and prepared using NLTK.

3. **Sentiment Analysis**  
   > Performed using TextBlob or VADER.

4. **Visualization**  
   >  Donut charts used to derive insights.

5. **Insights Generation**  
   > Used for gym management to act on user needs and trends.

---

## 📸 Screenshots

### 🔐 Admin Login  
![Admin Login](screenshots/admin_login.png)

### 📝 Feedback Submission  
![Feedback Form](screenshots/feedback_form.png)

### 📊 Dashboard View  
![Dashboard](screenshots/dashboard.png)

---

## 💡 Future Enhancements
- 🧠 Replace TextBlob with BERT-based sentiment model
- 📈 Use time-series analysis to monitor user satisfaction trends over time
- 💬 Chatbot for feedback collection
- 📱 Mobile app integration

---

## 🧪 Installation & Setup

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/MystroGym.git
cd MystroGym
````

2. **Install dependencies**

```bash
pip install -r requirements.txt
```

3. **Run the app**

```bash
python app.py
```

---

## 🧑‍💻 Author

**Ziyad Auti**
Passionate about building impactful platforms that combine **Data Science with real-world applications**.

---

## 📄 License

This project is licensed under the MIT License.

---

