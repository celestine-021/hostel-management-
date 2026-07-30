# Import the shared database object
from backend.models import db

# Import SerializerMixin
from sqlalchemy_serializer import SerializerMixin


# ============================================================
# HOSTEL AMENITY MODEL
# ============================================================
# This is an association table that connects hostels
# with the amenities they provide.
#
# Relationship:
#
# Hostel 1 -------- Many HostelAmenities Many -------- 1 Amenity
#
# This allows:
# - One hostel to have many amenities
# - One amenity to be available in many hostels
# ============================================================

class HostelAmenity(db.Model, SerializerMixin):

    # Name of the database table
    __tablename__ = "hostel_amenities"

    # Prevent circular references during serialization
    serialize_rules = (
        "-hostel.hostel_amenities",
        "-amenity.hostel_amenities",
    )

    # --------------------------------------------------------
    # PRIMARY KEY
    # --------------------------------------------------------
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # --------------------------------------------------------
    # HOSTEL FOREIGN KEY
    # --------------------------------------------------------
    # Connects this record to a specific hostel
    hostel_id = db.Column(
        db.Integer,
        db.ForeignKey("hostels.id"),
        nullable=False
    )

    # --------------------------------------------------------
    # AMENITY FOREIGN KEY
    # --------------------------------------------------------
    # Connects this record to a specific amenity
    amenity_id = db.Column(
        db.Integer,
        db.ForeignKey("amenities.id"),
        nullable=False
    )

    # --------------------------------------------------------
    # HOSTEL RELATIONSHIP
    # --------------------------------------------------------
    hostel = db.relationship(
        "Hostel",
        back_populates="hostel_amenities"
    )

    # --------------------------------------------------------
    # AMENITY RELATIONSHIP
    # --------------------------------------------------------
    amenity = db.relationship(
        "Amenity",
        back_populates="hostel_amenities"
    )