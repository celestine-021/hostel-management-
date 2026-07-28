# Import datetime so we can automatically record when a booking is created
from datetime import datetime

# Import SQLAlchemy for creating our database models
from flask_sqlalchemy import SQLAlchemy

# Import SerializerMixin to allow our models to be converted to dictionaries/JSON
from sqlalchemy_serializer import SerializerMixin


# Create the SQLAlchemy database object
# This object will be connected to our Flask application in app.py
db = SQLAlchemy()


# 
# USER MODEL
# This table stores information about users of the system.
# Examples of users include students and administrators.
#
# Relationship:
# User 1 ---- 1 Profile
# User 1 ---- Many Bookings
# 

class User(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "users"

    # Prevent sensitive data and circular relationships
    # from appearing when converting the model to JSON
    serialize_rules = (
        "-password",
        "-profile.user",
        "-bookings.user",
    )

    # Primary key - uniquely identifies each user
    id = db.Column(db.Integer, primary_key=True)

    # Username must be unique and cannot be empty
    username = db.Column(
        db.String(80),
        unique=True,
        nullable=False
    )

    # Email must be unique and cannot be empty
    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    # Stores the user's password
    # In a production application, passwords should be hashed
    password = db.Column(
        db.String(255),
        nullable=False
    )

    # Stores the user's role
    # The default role is "student"
    role = db.Column(
        db.String(20),
        nullable=False,
        default="student"
    )

    # 
    # 1:1 RELATIONSHIP
    # One user has exactly one profile
    # 
    profile = db.relationship(
        "Profile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )

    # 
    # 1:MANY RELATIONSHIP
    # One user can have many bookings
    # 
    bookings = db.relationship(
        "Booking",
        back_populates="user",
        cascade="all, delete-orphan",
    )


# 
# PROFILE MODEL
# 
# This table stores additional information about a user.
#
# Relationship:
# User 1 ---- 1 Profile
# 

class Profile(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "profiles"

    # Prevent circular serialization
    serialize_rules = (
        "-user.profile",
    )

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Student's full name
    full_name = db.Column(
        db.String(120),
        nullable=False
    )

    # Student's phone number
    phone_number = db.Column(
        db.String(20)
    )

    # JKUAT student registration number
    # Each registration number must be unique
    registration_number = db.Column(
        db.String(50),
        unique=True
    )

    # Student's course/programme
    course = db.Column(
        db.String(120)
    )

    # Student's current year of study
    year_of_study = db.Column(
        db.Integer
    )

    # Foreign key connecting the profile to the User table
    # UNIQUE ensures that one user can only have one profile
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        unique=True,
        nullable=False,
    )

    # Relationship back to the User model
    user = db.relationship(
        "User",
        back_populates="profile",
    )


# 
# HOSTEL MODEL
# 
# This table stores information about JKUAT hostels.
#
# Relationships:
# Hostel 1 ---- Many Rooms
# Hostel Many ---- Many Amenities
# 

class Hostel(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "hostels"

    # Prevent circular serialization
    serialize_rules = (
        "-rooms.hostel",
        "-hostel_amenities.hostel",
    )

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Name of the hostel
    name = db.Column(
        db.String(100),
        nullable=False
    )

    # Physical location of the hostel
    location = db.Column(
        db.String(150),
        nullable=False
    )

    # Description of the hostel
    description = db.Column(
        db.Text
    )

    # Gender category of the hostel
    # Example: Male, Female, or Mixed
    gender = db.Column(
        db.String(20),
        nullable=False
    )

    # 
    # 1:MANY RELATIONSHIP
    # One hostel can contain many rooms
    # 
    rooms = db.relationship(
        "Room",
        back_populates="hostel",
        cascade="all, delete-orphan",
    )

    # 
    # MANY:MANY RELATIONSHIP
    # A hostel can have many amenities
    # The relationship is handled through HostelAmenity
    # 
    hostel_amenities = db.relationship(
        "HostelAmenity",
        back_populates="hostel",
        cascade="all, delete-orphan",
    )


# 
# ROOM MODEL
# 
# This table stores information about rooms in each hostel.
#
# Relationships:
# Room Many ---- 1 Hostel
# Room 1 ---- Many Bookings
# 

class Room(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "rooms"

    # Prevent circular serialization
    serialize_rules = (
        "-hostel.rooms",
        "-bookings.room",
    )

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Room number or room identifier
    room_number = db.Column(
        db.String(20),
        nullable=False
    )

    # Maximum number of students the room can accommodate
    capacity = db.Column(
        db.Integer,
        nullable=False
    )

    # Number of students currently occupying the room
    occupied_spaces = db.Column(
        db.Integer,
        default=0,
        nullable=False
    )

    # Price or accommodation fee for the room
    price = db.Column(
        db.Float,
        nullable=False
    )

    # Current availability status of the room
    # Default status is "available"
    status = db.Column(
        db.String(20),
        nullable=False,
        default="available"
    )

    # Foreign key connecting the room to a hostel
    hostel_id = db.Column(
        db.Integer,
        db.ForeignKey("hostels.id"),
        nullable=False,
    )

    # 
    # MANY:1 RELATIONSHIP
    # Many rooms belong to one hostel
    # 
    hostel = db.relationship(
        "Hostel",
        back_populates="rooms",
    )

    # 
    # 1:MANY RELATIONSHIP
    # One room can have many bookings over time
    # 
    bookings = db.relationship(
        "Booking",
        back_populates="room",
        cascade="all, delete-orphan",
    )


# 
# BOOKING MODEL
# 
# This table stores room booking information.
#
# Relationships:
# User 1 ---- Many Bookings
# Room 1 ---- Many Bookings
# 

class Booking(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "bookings"

    # Prevent circular serialization
    serialize_rules = (
        "-user.bookings",
        "-room.bookings",
    )

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Automatically stores the date and time the booking was created
    booking_date = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # Date the student will move into the hostel
    check_in_date = db.Column(
        db.Date,
        nullable=False
    )

    # Date the student will leave the hostel
    check_out_date = db.Column(
        db.Date,
        nullable=False
    )

    # Current booking status
    # Examples: pending, approved, cancelled
    status = db.Column(
        db.String(20),
        nullable=False,
        default="pending",
    )

    # Foreign key connecting the booking to the user
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )

    # Foreign key connecting the booking to the room
    room_id = db.Column(
        db.Integer,
        db.ForeignKey("rooms.id"),
        nullable=False,
    )

    # 
    # MANY:1 RELATIONSHIP
    # Many bookings can belong to one user
    # 
    user = db.relationship(
        "User",
        back_populates="bookings",
    )

    # 
    # MANY:1 RELATIONSHIP
    # Many bookings can belong to one room
    room = db.relationship(
        "Room",
        back_populates="bookings",
    )


# 
# AMENITY MODEL
# 
# This table stores amenities that can be offered by hostels.
#
# Examples:
# - Wi-Fi
# - Laundry
# - Security
# - Parking
# 

class Amenity(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "amenities"

    # Prevent circular serialization
    serialize_rules = (
        "-hostel_amenities.amenity",
    )

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Name of the amenity
    # Each amenity name must be unique
    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    # Description of the amenity
    description = db.Column(
        db.Text
    )

    # 
    # MANY:MANY RELATIONSHIP
    # One amenity can be available in many hostels
    # The relationship is handled through HostelAmenity
    # 
    hostel_amenities = db.relationship(
        "HostelAmenity",
        back_populates="amenity",
        cascade="all, delete-orphan",
    )


# ============================================================
# HOSTEL AMENITY MODEL
# ============================================================
# This is a junction/association table.
#
# It connects Hostels and Amenities to create a
# MANY-TO-MANY relationship.
#
# Example:
#
# Hostel A -> Wi-Fi
# Hostel A -> Laundry
# Hostel B -> Wi-Fi
#
# 

class HostelAmenity(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "hostel_amenities"

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Foreign key connecting the record to a hostel
    hostel_id = db.Column(
        db.Integer,
        db.ForeignKey("hostels.id"),
        nullable=False,
    )

    # Foreign key connecting the record to an amenity
    amenity_id = db.Column(
        db.Integer,
        db.ForeignKey("amenities.id"),
        nullable=False,
    )

    # 
    # Relationship back to the Hostel model
    # 
    hostel = db.relationship(
        "Hostel",
        back_populates="hostel_amenities",
    )

    # 
    # Relationship back to the Amenity model
    # 
    amenity = db.relationship(
        "Amenity",
        back_populates="hostel_amenities",
    )

    # 
    # Prevent duplicate combinations
    #
    # This means the same amenity cannot be added to the
    # same hostel more than once.
    # 
    __table_args__ = (
        db.UniqueConstraint(
            "hostel_id",
            "amenity_id",
            name="unique_hostel_amenity",
        ),
    )