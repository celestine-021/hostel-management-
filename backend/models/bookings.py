from backend.models import db
from sqlalchemy_serializer import SerializerMixin


class Booking(db.Model, SerializerMixin):

    __tablename__ = "bookings"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )


    room_id = db.Column(
        db.Integer,
        db.ForeignKey("rooms.id"),
        nullable=False
    )


    status = db.Column(
        db.String(50),
        default="Pending"
    )


    user = db.relationship(
        "User",
        back_populates="bookings"
    )


    room = db.relationship(
        "Room",
        back_populates="bookings"
    )