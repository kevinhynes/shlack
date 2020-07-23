from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, EqualTo, Email, ValidationError

from models import User, Channel


class LoginForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember_me = BooleanField("Remember Me")
    submit = SubmitField("Log In")

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is None:
            raise ValidationError('Username not found.')


class SignUpForm(FlaskForm):
    avatar = StringField("Avatar", validators=[DataRequired()])
    username = StringField("Username", validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    password_repeat = PasswordField("Repeat Password",
                validators=[DataRequired(), EqualTo("password", message="Passwords must match")])
    submit = SubmitField("Register")

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')
        if not 8 <= len(username.data) <= 24:
            raise ValidationError("Username must be between 8 and 24 characters.")

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')


class NewChannelForm(FlaskForm):
    new_channel = StringField("Channel", validators=[DataRequired()])
    submit = SubmitField("Create")

    def validate_new_channel(self, new_channel):
        channel = Channel.query.filter_by(name=new_channel.data).first()
        if channel is not None:
            raise ValidationError("Channel with that name already exists.")
        if not 3 <= len(new_channel.data) <= 24:
            raise ValidationError("Channel name must be between 3 and 24 characters.")
        if not all(char.isalnum() for char in new_channel.data):
            raise ValidationError("Channel name can only contain letters and numbers.")
