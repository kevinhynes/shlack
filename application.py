from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
socketio = SocketIO(app)


@app.route("/")
def index():
    return render_template("layout.html", logged_in=False)

@app.route("/is_user_logged_in")
def is_user_logged_in():
    res = {'logged_in': True}
    return jsonify(res)
