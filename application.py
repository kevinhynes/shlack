from flask import Flask, request, render_template, redirect, jsonify, session, url_for, flash
from flask_socketio import SocketIO, emit
# My own / Flask Mega-Tutorial
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, login_required, login_user, logout_user, current_user
from werkzeug.urls import url_parse
import os


app = Flask(__name__)
app.config.from_object(Config)
socketio = SocketIO(app)
# Mega-Tutorial
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
login.login_view = 'login'


from models import User, Post
from forms import LoginForm, SignUpForm


@app.route("/ensureLogIn")
def is_user_logged_in():
    if 'logged_in' in session and session['logged_in']:
        response = {'logged_in': True}
    else:
        session['logged_in'] = False
        response = {'logged_in': False}
    print(response, flush=True)
    return jsonify(response)


@app.route("/")
@app.route("/index")
def index():
    return render_template("home.html", title="Home")


@app.route("/channels")
@login_required
def channels():
    return redirect(url_for("channel", channel="general"))


@app.route("/channels/<string:channel>")
@login_required  # calls wrapper() with arguments to books().
def channel(channel):
    # results = db.execute("SELECT * FROM Channels WHERE Author IN (:channel) ORDER BY Title ASC",
    #                    {"channel": channel}).fetchall()
    form = LoginForm()
    return render_template("channel.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("index"))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash("Invalid username or password")
            return redirect(url_for("login"))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get("next")
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for("channels")
        return redirect(next_page)
    return render_template("login.html", title="Log In", form=form)


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for("index"))
    form = SignUpForm()
    if form.validate_on_submit():
        filepath = form.avatar.data.replace("http://127.0.0.1:5000", "")
        user = User(avatar=filepath, username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect("/login")
    monster_files = ["./static/images/monsters/" + filename for filename in os.listdir("static/images/monsters")]
    return render_template("signup.html", title="Sign Up", form=form, monster_files=monster_files)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("index"))
