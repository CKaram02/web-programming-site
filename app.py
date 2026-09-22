from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    weekly_work = [
        {"week": 1, "title": "Live site launched", "url": "#"},
        {"week": 2, "title": "Internet History", "url": "/internet-history"},
        {"week": 2, "title": "Internet History (AI)", "url": "/internet-history-ai"},
        {"week": 2, "title": "Web History", "url": "/web-history"},
        {"week": 2, "title": "Web History (AI)", "url": "/web-history-ai"},
    ]
    return render_template("index.html", weekly_work=weekly_work)

@app.route("/internet-history")
def internet_history():
    return render_template("internet-history.html")

@app.route("/internet-history-ai")
def internet_history_ai():
    return render_template("internet-history-ai.html")

@app.route("/web-history")
def web_history():
    return render_template("web-history.html")

@app.route("/web-history-ai")
def web_history_ai():
    return render_template("web-history-ai.html")

if __name__ == "__main__":
    app.run(debug=True)