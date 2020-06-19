from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
socketio = SocketIO(app)


@app.route("/")
def index():
    return render_template("layout_test5.html")
