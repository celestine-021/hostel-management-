from flask import Flask, jsonify
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

    with app.app_context():
        db.create_all()

    # Test route
    @app.route("/")
    def home():
        return {
            "message": "JKUAT Hostel Management System API is running!"
        }

    @app.route("/profiles")
    def profiles():
        profiles = Profile.query.all()
        payload = [
            {
                "id": profile.id,
                "full_name": profile.full_name,
                "phone_number": profile.phone_number,
                "registration_number": profile.registration_number,
                "course": profile.course,
                "year_of_study": profile.year_of_study,
                "user_id": profile.user_id,
            }
            for profile in profiles
        ]
        return jsonify(payload)

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)