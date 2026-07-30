# Import the shared database object
from backend.models import db

# Import SerializerMixin for converting the model to dictionaries
from sqlalchemy_serializer import SerializerMixin


# ============================================================
# ROOM MODEL
# ============================================================
# This model represents individual rooms available in JKUAT
# hostels.
#
# Relationship:
#
# Hostel 1 -------- Many Rooms
#
# One hostel can have many rooms.
# Each room belongs to one hostel.
#
# Room 1 -------- Many Bookings
#
# One room can have many bookings over time.
# ============================================================

class Room(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "rooms"

    # Prevent circular references during serialization
    serialize_rules = (
        "-hostel.rooms",
        "-bookings.room",
    )

    # --------------------------------------------------------
    # PRIMARY KEY
    # --------------------------------------------------------
    # Unique identifier for each room
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

    # Number of spaces currently occupied
    occupied_spaces = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    # Accommodation price
    price = db.Column(
        db.Float,
        nullable=False
    )

    # Room availability status
    # Example: available, occupied, maintenance
    status = db.Column(
        db.String(20),
        nullable=False,
        default="available"
    )

    # --------------------------------------------------------
    # FOREIGN KEY
    # --------------------------------------------------------
    # Connects the room to a hostel.
    #
    # This creates:
    #
    # Hostel 1 -------- Many Rooms
    # --------------------------------------------------------

    hostel_id = db.Column(
        db.Integer,
        db.ForeignKey("hostels.id"),
        nullable=False
    )

    # --------------------------------------------------------
    # RELATIONSHIP WITH HOSTEL
    # --------------------------------------------------------
    # Allows us to access the hostel that owns this room.
    # --------------------------------------------------------

    hostel = db.relationship(
        "Hostel",
        back_populates="rooms"
    )

    # --------------------------------------------------------
    # RELATIONSHIP WITH BOOKINGS
    # --------------------------------------------------------
    # One room can have many bookings.
    # --------------------------------------------------------

    bookings = db.relationship(
        "Booking",
        back_populates="room",
        cascade="all, delete-orphan"
    )