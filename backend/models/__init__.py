# Import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy


# Create the shared database object
db = SQLAlchemy()


# Import all models so Flask-Migrate can detect them
from backend.models.users import User
from backend.models.profiles import Profile
from backend.models.hostels import Hostel
from backend.models.rooms import Room
from backend.models.bookings import Booking
from backend.models.amenities import Amenity
from backend.models.hostel_amenities import HostelAmenity