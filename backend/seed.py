# Import the Flask application
from backend.app import app

# Import the shared database object
from backend.models import db

# Import all database models
from backend.models.users import User
from backend.models.profiles import Profile
from backend.models.hostels import Hostel
from backend.models.rooms import Room
from backend.models.bookings import Booking
from backend.models.amenities import Amenity
from backend.models.hostel_amenities import HostelAmenity


# Create the application context
# This allows us to interact with the database
with app.app_context():

    # 
    # CLEAR EXISTING DATA
    # WARNING:
    # This deletes existing records from these tables.
    # We are doing this so the seed can be run repeatedly
    # during development without creating duplicate records.

    db.session.query(Booking).delete()
    db.session.query(HostelAmenity).delete()
    db.session.query(Profile).delete()
    db.session.query(Room).delete()
    db.session.query(Amenity).delete()
    db.session.query(Hostel).delete()
    db.session.query(User).delete()

    # 
    # CREATE USERS

    student1 = User(
        username="student1",
        email="student1@students.jkuat.ac.ke",
        password="password123",
        role="student"
    )

    student2 = User(
        username="student2",
        email="student2@students.jkuat.ac.ke",
        password="password123",
        role="student"
    )

    admin = User(
        username="admin",
        email="admin@jkuat.ac.ke",
        password="admin123",
        role="admin"
    )

    db.session.add_all([
        student1,
        student2,
        admin
    ])

    db.session.commit()

    # CREATE STUDENT PROFILES

    profile1 = Profile(
        full_name="John Mwangi",
        phone_number="0712345678",
        registration_number="EN01-0001-2024",
        course="Computer Science",
        year_of_study=2,
        user_id=student1.id
    )

    profile2 = Profile(
        full_name="Jane Wanjiku",
        phone_number="0723456789",
        registration_number="EN01-0002-2024",
        course="Information Technology",
        year_of_study=3,
        user_id=student2.id
    )

    db.session.add_all([
        profile1,
        profile2
    ])

    # CREATE HOSTELS

    hostel1 = Hostel(
        name="JKUAT Hostel A",
        location="Main Campus",
        description="Student accommodation near the main campus.",
        gender="mixed"
    )

    hostel2 = Hostel(
        name="JKUAT Hostel B",
        location="Main Campus",
        description="Affordable student accommodation.",
        gender="mixed"
    )

    db.session.add_all([
        hostel1,
        hostel2
    ])

    db.session.commit()

    user_count = db.session.query(User).count()
    profile_count = db.session.query(Profile).count()
    hostel_count = db.session.query(Hostel).count()
    room_count = db.session.query(Room).count()
    booking_count = db.session.query(Booking).count()

    print(
        f"Seed data created successfully: {user_count} users, {profile_count} profiles, "
        f"{hostel_count} hostels, {room_count} rooms, {booking_count} bookings."
    )
