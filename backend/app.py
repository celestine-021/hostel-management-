from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
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

    # Enable CORS
    CORS(app)

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

    @app.route("/hostels", methods=["GET", "POST"])
    def hostels():
        if request.method == "POST":
            data = request.get_json(silent=True) or {}
            hostel = Hostel(
                name=data.get("name", "").strip(),
                location=data.get("location", "").strip(),
                description=data.get("description", "").strip(),
                gender=data.get("gender", "mixed").strip(),
            )
            db.session.add(hostel)
            db.session.commit()
            return jsonify({"message": "Hostel created", "hostel": {"id": hostel.id, "name": hostel.name}})

        hostels_list = Hostel.query.all()
        return jsonify([
            {
                "id": hostel.id,
                "name": hostel.name,
                "location": hostel.location,
                "description": hostel.description,
                "gender": hostel.gender,
                "total_rooms": len(hostel.rooms),
                "available_rooms": sum(1 for room in hostel.rooms if room.status == "available"),
            }
            for hostel in hostels_list
        ])

    @app.route("/rooms", methods=["GET", "POST"])
    def rooms():
        if request.method == "POST":
            data = request.get_json(silent=True) or {}
            hostel = Hostel.query.get(data.get("hostel_id"))
            if not hostel:
                return jsonify({"message": "Hostel not found"}), 404

            room = Room(
                hostel_id=hostel.id,
                room_number=data.get("room_number", "").strip(),
                capacity=int(data.get("capacity", 0)),
                occupied_spaces=int(data.get("occupied_spaces", 0)),
                price=float(data.get("price", 0)),
                status=data.get("status", "available"),
            )
            db.session.add(room)
            db.session.commit()
            return jsonify({"message": "Room created", "room": {"id": room.id, "room_number": room.room_number}})

        rooms_list = Room.query.all()
        return jsonify([
            {
                "id": room.id,
                "room_number": room.room_number,
                "hostel": room.hostel.name,
                "capacity": room.capacity,
                "occupied_spaces": room.occupied_spaces,
                "available_beds": room.capacity - room.occupied_spaces,
                "status": room.status,
            }
            for room in rooms_list
        ])

    @app.route("/students", methods=["GET", "POST"])
    def students():
        if request.method == "POST":
            data = request.get_json(silent=True) or {}
            email = (data.get("email") or "").strip().lower()
            password = data.get("password") or ""
            user = User.query.filter_by(email=email).first()
            if not user:
                user = User(
                    username=(data.get("full_name") or email.split("@")[0]).replace(" ", "").lower(),
                    email=email,
                    password=password,
                    role="student",
                )
                db.session.add(user)
                db.session.commit()

            profile = Profile(
                full_name=data.get("full_name", "").strip(),
                phone_number=data.get("phone_number", "").strip(),
                registration_number=data.get("registration_number", "").strip(),
                course=data.get("course", "").strip(),
                year_of_study=int(data.get("year_of_study", 0) or 0),
                user_id=user.id,
            )
            db.session.add(profile)
            db.session.commit()
            return jsonify({"message": "Student created", "student": {"id": user.id, "email": user.email}})

        students_list = []
        for user in User.query.filter_by(role="student").all():
            profile = Profile.query.filter_by(user_id=user.id).first()
            students_list.append({
                "id": user.id,
                "full_name": profile.full_name if profile else user.username,
                "email": user.email,
                "phone_number": profile.phone_number if profile else "",
                "registration_number": profile.registration_number if profile else "",
                "course": profile.course if profile else "",
                "year_of_study": profile.year_of_study if profile else 0,
            })
        return jsonify(students_list)

    @app.route("/auth/login", methods=["POST"])
    def login():
        data = request.get_json(silent=True) or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        if not email or not password:
            return jsonify({"message": "Email and password are required."}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            username = email.split("@")[0]
            role = "admin" if email == "admin@jkuat.ac.ke" else "student"
            user = User(
                username=username,
                email=email,
                password=password,
                role=role,
            )
            db.session.add(user)
            db.session.commit()
        elif user.password != password:
            return jsonify({"message": "Invalid email or password."}), 401

        return jsonify({
            "message": "Login successful",
            "token": f"token-{user.id}",
            "role": user.role,
            "email": user.email,
        })

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)