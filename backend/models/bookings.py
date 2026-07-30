# Import the shared database object
from backend.models import db

# Import SerializerMixin for converting the model into dictionaries
from sqlalchemy_serializer import SerializerMixin


# ============================================================
# BOOKING MODEL
# ============================================================
# This model stores hostel room booking information.
#
# Relationships:
#
# User 1 -------- Many Bookings
#
# One user can make many bookings.
#
# Room 1 -------- Many Bookings
#
# One room can have many bookings over time.
# ============================================================

class Booking(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "bookings"

    # Prevent circular references when converting
    # the booking object to JSON
    serialize_rules = (
        "-user.bookings",
        "-room.bookings",
    )

    # --------------------------------------------------------
    # PRIMARY KEY
    # --------------------------------------------------------
    # Unique identifier for each booking
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # --------------------------------------------------------
    # BOOKING DATE
    # --------------------------------------------------------
    # Automatically records the date and time
    # when the booking is created
    booking_date = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        nullable=False
    )

    # --------------------------------------------------------
    # CHECK-IN DATE
    # --------------------------------------------------------
    # Date when the student is expected to move into the room
    check_in_date = db.Column(
        db.Date,
        nullable=False
    )

    # --------------------------------------------------------
    # CHECK-OUT DATE
    # --------------------------------------------------------
    # Date when the student is expected to leave the room
    check_out_date = db.Column(
        db.Date,
        nullable=False
    )

    # --------------------------------------------------------
    # BOOKING STATUS
    # --------------------------------------------------------
    # Tracks the current state of the booking.
    #
    # Examples:
    # pending
    # approved
    # cancelled
    # completed
    # --------------------------------------------------------
    status = db.Column(
        db.String(20),
        nullable=False,
        default="pending"
    )

    # --------------------------------------------------------
    # USER FOREIGN KEY
    # --------------------------------------------------------
    # Connects the booking to the student/user
    #
    # User 1 -------- Many Bookings
    # --------------------------------------------------------
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # --------------------------------------------------------
    # ROOM FOREIGN KEY
    # --------------------------------------------------------
    # Connects the booking to the room being booked
    #
    # Room 1 -------- Many Bookings
    # --------------------------------------------------------
    room_id = db.Column(
        db.Integer,
        db.ForeignKey("rooms.id"),
        nullable=False
    )