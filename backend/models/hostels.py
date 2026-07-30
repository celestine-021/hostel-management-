from backend.models import db
from sqlalchemy_serializer import SerializerMixin


class Hostel(db.Model, SerializerMixin):
    __tablename__ = "hostels"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    location = db.Column(
        db.String(150),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    gender = db.Column(
        db.String(20),
        nullable=False
    )

    rooms = db.relationship(
        "Room",
        back_populates="hostel",
        cascade="all, delete-orphan"
    )

    hostel_amenities = db.relationship(
        "HostelAmenity",
        back_populates="hostel",
        cascade="all, delete-orphan"
    )