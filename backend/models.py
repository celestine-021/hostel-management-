from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-password", "-profile.user", "-bookings.user")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="student")

    profile = db.relationship(
        "Profile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )

    bookings = db.relationship(
        "Booking",
        back_populates="user",
        cascade="all, delete-orphan"
    )