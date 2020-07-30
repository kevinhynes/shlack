from application import db, login
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, timedelta

# Needed for flask_login to work...
@login.user_loader
def load_user(id_):
    return User.query.get(int(id_))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(64))
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship("Post", backref="author", lazy="dynamic")

    def __repr__(self):
        return f'User {self.username}'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(300))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    channel_id = db.Column(db.Integer, db.ForeignKey("channel.id"))

    def __repr__(self):
        return f'Post {[(str(key), str(val)) for key,val in self.__dict__.items()]}'

    @property
    def get_time_passed(self):
        now = datetime.utcnow()
        delta = now - self.timestamp
        if timedelta(seconds=0) <= delta < timedelta(minutes=2):
            return "1 min ago"
        elif timedelta(minutes=2) <= delta < timedelta(minutes=60):
            minutes = int(delta.total_seconds() // 60)
            return str(minutes) + " mins ago"
        elif timedelta(hours=1) <= delta < timedelta(hours=2):
            hours = int(delta.total_seconds() // 3600)
            return str(hours) + " hour ago"
        elif timedelta(minutes=60) <= delta < timedelta(hours=24):
            hours = int(delta.total_seconds() // 3600)
            return str(hours) + " hours ago"
        elif timedelta(hours=24) <= delta < timedelta(days=2):
            days = int(delta.total_seconds() // 86400)
            return str(days) + " day ago"
        elif timedelta(hours=2) <= delta < timedelta(days=365):
            days = int(delta.total_seconds() // 86400)
            return str(days) + " days ago"
        else:
            return "Error occurred"


class Channel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300))
    posts = db.relationship("Post", backref="channel", lazy="dynamic")

    def __repr__(self):
        return f"Channel {[(str(key), str(val)) for key,val in self.__dict__.items()]}"

