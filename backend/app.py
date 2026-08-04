from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from backend.models import db

# Import database models for SQLAlchemy and Flask-Migrate
from backend.models.users import User
from backend.models.profiles import Profile
from backend.models.hostels import Hostel
from backend.models.rooms import Room
from backend.models.bookings import Booking
from backend.models.amenities import Amenity

from backend.config import Config


def create_app():
    # Initialize main Flask instance
    app = Flask(__name__)

    # Configure CORS to accept requests across origins and headers
    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=True,
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )

    # Load configuration settings
    app.config.from_object(Config)

    # Initialize SQLAlchemy database instance with app
    db.init_app(app)

    # Initialize Flask-Migrate extension
    Migrate(app, db)

    # Ensure database schema and tables exist on startup (helps when running on fresh Render instances)
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f"Database initialization note: {e}")

    # Health check route
    @app.route("/")
    def home():
        return {
            "message": "JKUAT Hostel Management System API is running!"
        }

    # Fetch user profiles list
    @app.route("/profiles", methods=["GET", "OPTIONS"])
    def profiles():
        if request.method == "OPTIONS":
            return "", 200

        profiles_list = Profile.query.all()
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
            for profile in profiles_list
        ]
        return jsonify(payload), 200

    # Manage hostels: fetch all or create a new hostel record
    @app.route("/hostels", methods=["GET", "POST", "OPTIONS"])
    def hostels():
        if request.method == "OPTIONS":
            return "", 200

        if request.method == "POST":
            try:
                data = request.get_json(silent=True) or {}
                hostel = Hostel(
                    name=data.get("name", "").strip(),
                    location=data.get("location", "").strip(),
                    description=data.get("description", "").strip(),
                    gender=data.get("gender", "mixed").strip(),
                )
                db.session.add(hostel)
                db.session.commit()
                return jsonify({
                    "message": "Hostel created", 
                    "hostel": {"id": hostel.id, "name": hostel.name}
                }), 201
            except Exception as e:
                db.session.rollback()
                return jsonify({"message": f"Error creating hostel: {str(e)}"}), 500

        hostels_list = Hostel.query.all()
        return jsonify([
            {
                "id": hostel.id,
                "name": hostel.name,
                "location": hostel.location,
                "description": hostel.description,
                "gender": hostel.gender,
                "total_rooms": len(hostel.rooms) if hostel.rooms else 0,
                "available_rooms": sum(1 for room in hostel.rooms if room.status == "available") if hostel.rooms else 0,
            }
            for hostel in hostels_list
        ]), 200

    # Manage rooms: fetch all or assign new room to hostel
    @app.route("/rooms", methods=["GET", "POST", "OPTIONS"])
    def rooms():
        if request.method == "OPTIONS":
            return "", 200

        if request.method == "POST":
            try:
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
                return jsonify({
                    "message": "Room created", 
                    "room": {"id": room.id, "room_number": room.room_number}
                }), 201
            except Exception as e:
                db.session.rollback()
                return jsonify({"message": f"Error creating room: {str(e)}"}), 500

        rooms_list = Room.query.all()
        return jsonify([
            {
                "id": room.id,
                "room_number": room.room_number,
                "hostel": room.hostel.name if room.hostel else "Unassigned",
                "capacity": room.capacity,
                "occupied_spaces": room.occupied_spaces,
                "available_beds": room.capacity - room.occupied_spaces,
                "status": room.status,
            }
            for room in rooms_list
        ]), 200

    # Manage student profiles: fetch all or register a new student user & profile
    @app.route("/students", methods=["GET", "POST", "OPTIONS"])
    def students():
        if request.method == "OPTIONS":
            return "", 200

        if request.method == "POST":
            try:
                data = request.get_json(silent=True) or {}
                email = (data.get("email") or "").strip().lower()
                password = data.get("password") or "default123"

                if not email:
                    return jsonify({"message": "Email is required."}), 400

                # Check if user account already exists before creating
                user = User.query.filter_by(email=email).first()
                if not user:
                    username = (data.get("full_name") or email.split("@")[0]).replace(" ", "").lower()
                    user = User(
                        username=username,
                        email=email,
                        password=password,
                        role="student",
                    )
                    db.session.add(user)
                    db.session.commit()

                # Find or link profile attached to this user account
                profile = Profile.query.filter_by(user_id=user.id).first()
                if not profile:
                    profile = Profile(
                        full_name=data.get("full_name", "").strip(),
                        phone_number=data.get("phone_number", "").strip(),
                        registration_number=data.get("registration_number", "").strip(),
                        course=data.get("course", "").strip(),
                        year_of_study=int(data.get("year_of_study", 1) or 1),
                        user_id=user.id,
                    )
                    db.session.add(profile)
                else:
                    profile.full_name = data.get("full_name", profile.full_name)
                    profile.phone_number = data.get("phone_number", profile.phone_number)
                    profile.registration_number = data.get("registration_number", profile.registration_number)
                    profile.course = data.get("course", profile.course)
                    profile.year_of_study = int(data.get("year_of_study", profile.year_of_study))

                db.session.commit()
                return jsonify({
                    "message": "Student record updated", 
                    "student": {"id": user.id, "email": user.email}
                }), 201

            except Exception as e:
                db.session.rollback()
                return jsonify({"message": f"Error saving student: {str(e)}"}), 500

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
        return jsonify(students_list), 200

    # User authentication endpoint
    @app.route("/auth/login", methods=["POST", "OPTIONS"])
    def login():
        # Handle browser preflight checks explicitly
        if request.method == "OPTIONS":
            return "", 200

        try:
            data = request.get_json(silent=True) or {}
            email = (data.get("email") or "").strip().lower()
            password = data.get("password") or ""

            if not email or not password:
                return jsonify({"message": "Email and password are required."}), 400

            # Find matching user in database
            user = User.query.filter_by(email=email).first()

            # Auto-register admin or user if first time logging in
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
            }), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Server error: {str(e)}"}), 500

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)