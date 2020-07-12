from flask import Flask, render_template, redirect, jsonify, session, url_for
from flask_socketio import SocketIO, emit
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
socketio = SocketIO(app)


@app.route("/")
def index():
    logged_in = session.get('logged_in', False)
    return render_template("layout.html", logged_in=logged_in)


@app.route("/ensureLogIn")
def is_user_logged_in():
    if 'logged_in' in session and session['logged_in']:
        response = {'logged_in': True}
    else:
        session['logged_in'] = False
        response = {'logged_in': False}
    print(response, flush=True)
    return jsonify(response)


@app.route("/login", methods=["GET", "POST"])
def login():
    session['logged_in'] = True
    return redirect(url_for("index"))


@app.route("/example")
def example():
    return render_template("example.html")
