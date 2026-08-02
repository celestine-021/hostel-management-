# ============================================================
# JKUAT HOSTEL MANAGEMENT SYSTEM
# DATABASE SEED FILE
# ============================================================

# Import the Flask application
from app import app

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


# ============================================================
# CREATE FLASK APPLICATION CONTEXT
# ============================================================

with app.app_context():

    # ========================================================
    # CLEAR EXISTING DATA
    # ========================================================
    # This allows us to run the seed file again without
    # creating duplicate records.
    #
    # WARNING:
    # This deletes existing development data.
    # Do not use this approach in production.
    # ========================================================

    db.session.query(Booking).delete()
    db.session.query(HostelAmenity).delete()
    db.session.query(Profile).delete()
    db.session.query(Room).delete()
    db.session.query(Amenity).delete()
    db.session.query(Hostel).delete()
    db.session.query(User).delete()

    db.session.commit()


    # ========================================================
    # CREATE USERS
    # ========================================================

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

    # Add users to the database
    db.session.add_all([
        student1,
        student2,
        admin
    ])

    # Save users so their IDs are generated
    db.session.commit()


    # ========================================================
    # CREATE STUDENT PROFILES
    # ========================================================

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

    # Add profiles
    db.session.add_all([
        profile1,
        profile2
    ])

    db.session.commit()


    # ========================================================
    # CREATE HOSTELS
    # ========================================================

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

    # Add hostels
    db.session.add_all([
        hostel1,
        hostel2
    ])

    db.session.commit()


    # ========================================================
    # CREATE ROOMS
    # ========================================================

    room1 = Room(
        room_number="A101",
        capacity=4,
        occupied_spaces=1,
        price=15000,
        status="available",
        hostel_id=hostel1.id
    )

    room2 = Room(
        room_number="A102",
        capacity=4,
        occupied_spaces=0,
        price=15000,
        status="available",
        hostel_id=hostel1.id
    )

    room3 = Room(
        room_number="B101",
        capacity=2,
        occupied_spaces=1,
        price=18000,
        status="available",
        hostel_id=hostel2.id
    )

    # Add rooms
    db.session.add_all([
        room1,
        room2,
        room3
    ])

    db.session.commit()


    # ========================================================
    # CREATE AMENITIES
    # ========================================================

    wifi = Amenity(
        name="Wi-Fi",
        description="Internet access for hostel residents."
    )

    water = Amenity(
        name="Water",
        description="Reliable water supply."
    )

    laundry = Amenity(
        name="Laundry",
        description="Laundry facilities available to residents."
    )

    security = Amenity(
        name="Security",
        description="24-hour hostel security."
    )

    # Add amenities
    db.session.add_all([
        wifi,
        water,
        laundry,
        security
    ])

    db.session.commit()


    # ========================================================
    # CONNECT HOSTELS WITH AMENITIES
    # ========================================================

    hostel1_wifi = HostelAmenity(
        hostel_id=hostel1.id,
        amenity_id=wifi.id
    )

    hostel1_water = HostelAmenity(
        hostel_id=hostel1.id,
        amenity_id=water.id
    )

    hostel1_security = HostelAmenity(
        hostel_id=hostel1.id,
        amenity_id=security.id
    )

    hostel2_wifi = HostelAmenity(
        hostel_id=hostel2.id,
        amenity_id=wifi.id
    )

    hostel2_water = HostelAmenity(
        hostel_id=hostel2.id,
        amenity_id=water.id
    )

    hostel2_laundry = HostelAmenity(
        hostel_id=hostel2.id,
        amenity_id=laundry.id
    )

    # Add hostel-amenity relationships
    db.session.add_all([
        hostel1_wifi,
        hostel1_water,
        hostel1_security,
        hostel2_wifi,
        hostel2_water,
        hostel2_laundry
    ])

    db.session.commit()


    # ========================================================
    # CREATE BOOKINGS
    # ========================================================

    booking1 = Booking(
        check_in_date="2026-09-01",
        check_out_date="2027-06-30",
        status="approved",
        user_id=student1.id,
        room_id=room1.id
    )

    booking2 = Booking(
        check_in_date="2026-09-01",
        check_out_date="2027-06-30",
        status="pending",
        user_id=student2.id,
        room_id=room3.id
    )

    # Add bookings
    db.session.add_all([
        booking1,
        booking2
    ])

    # Save all remaining data
    db.session.commit()


    # ========================================================
    # SUCCESS MESSAGE
    # ========================================================

    print("========================================")
    print("DATABASE SEEDING COMPLETED SUCCESSFULLY")
    print("========================================")
    print("Users created: 3")
    print("Profiles created: 2")
    print("Hostels created: 2")
    print("Rooms created: 3")
    print("Amenities created: 4")
    print("Hostel amenities created: 6")
    print("Bookings created: 2")
    print("========================================")