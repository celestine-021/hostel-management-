# Import the shared database object
from backend.models import db

# Import SerializerMixin for converting models to dictionaries
from sqlalchemy_serializer import SerializerMixin


# User model represents users of the JKUAT Hostel Management System
class User(db.Model, SerializerMixin):

    # Database table name
    __tablename__ = "users"

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Username
    username = db.Column(
        db.String(80),
        unique=True,
        nullable=False
    )

    # Email address
    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    # User password
    password = db.Column(
        db.String(255),
        nullable=False
    )

    # User role
    role = db.Column(
        db.String(20),
        nullable=False,
        default="student"
    )
    # Relationship to Profile model
    profile = db.relationship(
        "Profile",        
        back_populates="user",
        uselist=False,  # One-to-one relationship
        cascade="all, delete-orphan"
    )

    # Relationship to Booking model
    bookings = db.relationship(
        "Booking",
        back_populates="user",
        cascade="all, delete-orphan"
    )