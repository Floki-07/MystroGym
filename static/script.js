async function submitFeedback() {
    const message = document.getElementById("feedback").value;

    if (!message.trim()) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Please enter some feedback.</p>";
        return;
    }

    const res = await fetch("/submit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });

    if (res.ok) {
        document.getElementById("result").innerHTML = `
      <p style="margin-top: 20px; color: green; font-weight: bold;">
        Feedback has been recorded.
      </p>
    `;
        document.getElementById("feedback").value = ""; // clear textarea
    } else {
        document.getElementById("result").innerHTML = `
  <div style="margin-top: 20px; padding: 10px; background-color: #d4edda; border-left: 5px solid #28a745; color: #155724; border-radius: 4px;">
    Feedback has been recorded.
  </div>
`;
    }
}
async function loadDashboard() {
    const res = await fetch("/feedbacks");
    const data = await res.json();

    const sentiments = { Positive: 0, Negative: 0, Neutral: 0 };
    const trend = {};

    data.forEach(fb => {
        sentiments[fb.sentiment]++;
        const date = new Date(fb.timestamp).toLocaleDateString();
        if (!trend[date]) trend[date] = 0;
        trend[date] += fb.polarity;
    });

    const ctx1 = document.getElementById("sentimentChart").getContext("2d");
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: Object.keys(sentiments),
            datasets: [{
                label: '# of Feedbacks',
                data: Object.values(sentiments),
                backgroundColor: ["green", "red", "gray"]
            }]
        }
    });

    const ctx2 = document.getElementById("trendChart").getContext("2d");
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Object.keys(trend),
            datasets: [{
                label: 'Polarity Trend',
                data: Object.values(trend),
                borderColor: "blue",
                fill: false
            }]
        }
    });
}

if (document.body.contains(document.getElementById("sentimentChart"))) {
    loadDashboard();
}

function logout() {
    window.location.href = "/logout";
}



async function loadDashboard() {
    const res = await fetch("/feedbacks");
    const data = await res.json();

    const sentiments = { Positive: 0, Negative: 0, Neutral: 0 };
    const trend = {};

    data.forEach(fb => {
        sentiments[fb.sentiment]++;
        const date = new Date(fb.timestamp).toLocaleDateString();
        if (!trend[date]) trend[date] = 0;
        trend[date] += fb.polarity;
    });

    const ctx1 = document.getElementById("sentimentChart").getContext("2d");
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: Object.keys(sentiments),
            datasets: [{
                label: '# of Feedbacks',
                data: Object.values(sentiments),
                backgroundColor: ["green", "red", "gray"]
            }]
        }
    });

    const ctx2 = document.getElementById("trendChart").getContext("2d");
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Object.keys(trend),
            datasets: [{
                label: 'Polarity Trend',
                data: Object.values(trend),
                borderColor: "blue",
                fill: false
            }]
        }
    });
}

if (document.body.contains(document.getElementById("sentimentChart"))) {
    loadDashboard();
}

function logout() {
    window.location.href = "/logout";
}