from flask import Flask, render_template, redirect, jsonify, session, url_for, flash
from flask_socketio import SocketIO, emit
# My own / Flask Mega-Tutorial
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import functools

app = Flask(__name__)
app.config.from_object(Config)
socketio = SocketIO(app)
# Mega-Tutorial
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import User, Post
from forms import LoginForm


# @app.route("/old")
# def old():
#     logged_in = session.get('logged_in', False)
#     return render_template("old_layout.html", logged_in=logged_in)


def login_required(route_func):
    @functools.wraps(route_func)  # returns wrapper as route_func (?).
    def wrapper(*args, **kwargs):
        if "logged_in" in session:
            return route_func(*args, **kwargs)
        else:
            flash("You must log in to use GoodBookBadBook.", category="error")
            return redirect(url_for('login'))
    return wrapper


@app.route("/ensureLogIn")
def is_user_logged_in():
    if 'logged_in' in session and session['logged_in']:
        response = {'logged_in': True}
    else:
        session['logged_in'] = False
        response = {'logged_in': False}
    print(response, flush=True)
    return jsonify(response)


@app.route("/", methods=["GET", "POST"])
def index():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login successful for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        session["logged_in"] = True
        return redirect('/chat')
    logged_in = session.get('logged_in', False)
    return render_template("home.html", title="Home", form=form, logged_in=logged_in)


@app.route("/chat")
@login_required
def chat():
    form = LoginForm()
    logged_in = session.get('logged_in', False)
    return render_template("chat.html", title="Chat", form=form, logged_in=logged_in)


# Different HTML page for logging in, testing Flask-WTF
@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login successful for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        session["logged_in"] = True
        return redirect("/chat")
    return render_template("login.html", title="Sign In", form=form)


@app.route("/logout")
def logout():
    session.pop("logged_in")
    return redirect(url_for("index"))
