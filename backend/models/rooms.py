from backend.models import db
from sqlalchemy_serializer import SerializerMixin


class Room(db.Model, SerializerMixin):

    __tablename__ = "rooms"

    serialize_rules = (
        "-hostel.rooms",
        "-bookings.room",
    )

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    room_number = db.Column(
        db.String(20),
        nullable=False
    )

    capacity = db.Column(
        db.Integer,
        nullable=False
    )

    occupied_spaces = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    price = db.Column(
        db.Float,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="available"
    )

    hostel_id = db.Column(
        db.Integer,
        db.ForeignKey("hostels.id"),
        nullable=False
    )


    hostel = db.relationship(
        "Hostel",
        back_populates="rooms"
    )


    bookings = db.relationship(
        "Booking",
        back_populates="room",
        cascade="all, delete-orphan"
    )