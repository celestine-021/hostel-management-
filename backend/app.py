# Import Flask
from flask import Flask

# Import Flask-Migrate
from flask_migrate import Migrate

# Import the shared database object
from backend.models import db

# Import all models so Flask-Migrate can detect them
from backend.models import (
    Users,
    Profiles,
    Hostels,
    Rooms,
    Bookings,
    Amenities,
)

# Import application configuration
from backend.config import Config


# Create the Flask application
def create_app():

    # Initialize Flask
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize SQLAlchemy
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


# Create application instance
app = create_app()


# Run application directly
if __name__ == "__main__":
    app.run(debug=True)