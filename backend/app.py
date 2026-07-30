from flask import Flask
from flask_migrate import Migrate

from backend.models import db

# Import models so Flask-Migrate knows about them
from backend.models.users import User
from backend.models.profiles import Profile
from backend.models.hostels import Hostel
from backend.models.rooms import Room
from backend.models.bookings import Booking
from backend.models.amenities import Amenity

from backend.config import Config


def create_app():

    # Create Flask application
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize database
    db.init_app(app)

    # Initialize Flask-Migrate
    Migrate(app, db)

    # Test route
    @app.route("/")
    def home():
        return {
            "message": "JKUAT Hostel Management System API is running!"
        }

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)