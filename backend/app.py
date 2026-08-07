from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS

from backend.models import db

# Import models
from backend.models.users import User
from backend.models.profiles import Profile
from backend.models.hostels import Hostel
from backend.models.rooms import Room
from backend.models.bookings import Booking
from backend.models.amenities import Amenity

from backend.config import Config



def create_app():

    app = Flask(__name__)


    # CORS configuration
    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=True,
        methods=[
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS"
        ],
        allow_headers=[
            "Content-Type",
            "Authorization"
        ],
    )


    # Load configuration
    app.config.from_object(Config)


    # Initialize database
    db.init_app(app)


    # Initialize migrations
    Migrate(app, db)



    # Create tables
    with app.app_context():

        try:
            db.create_all()

        except Exception as e:

            print(
                f"Database initialization note: {e}"
            )



    # Home route

    @app.route("/")
    def home():

        return jsonify({

            "message":
            "JKUAT Hostel Management System API is running!"

        })



    # -----------------------------
    # PROFILES
    # -----------------------------

    @app.route(
        "/profiles",
        methods=["GET", "OPTIONS"]
    )
    def profiles():

        if request.method == "OPTIONS":

            return "", 200



        profiles_list = Profile.query.all()



        return jsonify([

            {

                "id": profile.id,

                "full_name": profile.full_name,

                "phone_number": profile.phone_number,

                "registration_number":
                    profile.registration_number,

                "course": profile.course,

                "year_of_study":
                    profile.year_of_study,

                "user_id":
                    profile.user_id

            }

            for profile in profiles_list

        ]),200




    # -----------------------------
    # HOSTELS
    # -----------------------------

    @app.route(
        "/hostels",
        methods=["GET","POST","OPTIONS"]
    )
    def hostels():

        if request.method == "OPTIONS":

            return "",200



        if request.method == "POST":

            try:

                data = request.get_json() or {}



                hostel = Hostel(

                    name=data.get("name",""),

                    location=data.get("location",""),

                    description=data.get(
                        "description",
                        ""
                    ),

                    gender=data.get(
                        "gender",
                        "mixed"
                    )

                )



                db.session.add(hostel)

                db.session.commit()



                return jsonify({

                    "message":
                    "Hostel created",

                    "id":
                    hostel.id

                }),201



            except Exception as e:


                db.session.rollback()


                return jsonify({

                    "message":
                    str(e)

                }),500




        hostels_list = Hostel.query.all()



        return jsonify([


            {

                "id": hostel.id,

                "name": hostel.name,

                "location": hostel.location,

                "description": hostel.description,

                "gender": hostel.gender,

                "total_rooms":
                    len(hostel.rooms)
                    if hostel.rooms else 0,


                "available_rooms":

                    sum(

                        1 for room in hostel.rooms

                        if room.status.lower()
                        == "available"

                    )

                    if hostel.rooms else 0


            }


            for hostel in hostels_list


        ]),200




    # -----------------------------
    # ROOMS
    # -----------------------------

    @app.route(
        "/rooms",
        methods=["GET","POST","OPTIONS"]
    )
    def rooms():

        if request.method == "OPTIONS":

            return "",200



        if request.method == "POST":

            try:

                data = request.get_json() or {}



                hostel = Hostel.query.get(
                    data.get("hostel_id")
                )



                if not hostel:

                    return jsonify({

                        "message":
                        "Hostel not found"

                    }),404




                room = Room(

                    hostel_id=hostel.id,

                    room_number=
                    data.get(
                        "room_number",
                        ""
                    ),

                    capacity=int(
                        data.get(
                            "capacity",
                            0
                        )
                    ),

                    occupied_spaces=int(
                        data.get(
                            "occupied_spaces",
                            0
                        )
                    ),

                    price=float(
                        data.get(
                            "price",
                            0
                        )
                    ),

                    status=data.get(
                        "status",
                        "available"
                    )

                )



                db.session.add(room)

                db.session.commit()



                return jsonify({

                    "message":
                    "Room created",

                    "id":
                    room.id

                }),201



            except Exception as e:


                db.session.rollback()


                return jsonify({

                    "message":
                    str(e)

                }),500





        rooms_list = Room.query.all()



        return jsonify([


            {

                "id":room.id,

                "room_number":
                room.room_number,

                "hostel":
                room.hostel.name
                if room.hostel else
                "Unassigned",

                "capacity":
                room.capacity,

                "occupied_spaces":
                room.occupied_spaces,

                "available_beds":
                room.capacity -
                room.occupied_spaces,

                "status":
                room.status

            }


            for room in rooms_list


        ]),200

    # -----------------------------
    # STUDENTS
    # -----------------------------

    @app.route(
        "/students",
        methods=["GET", "POST", "OPTIONS"]
    )
    def students():

        if request.method == "OPTIONS":

            return "", 200



        # Create student

        if request.method == "POST":

            try:

                data = request.get_json() or {}

                email = (
                    data.get("email")
                    or ""
                ).strip().lower()


                password = (
                    data.get("password")
                    or "default123"
                )



                if not email:

                    return jsonify({

                        "message":
                        "Email is required"

                    }),400




                user = User.query.filter_by(
                    email=email
                ).first()



                if not user:

                    username = (
                        data.get("full_name")
                        or email.split("@")[0]
                    ).replace(" ","").lower()



                    user = User(

                        username=username,

                        email=email,

                        password=password,

                        role="student"

                    )


                    db.session.add(user)

                    db.session.commit()




                profile = Profile.query.filter_by(
                    user_id=user.id
                ).first()



                if not profile:


                    profile = Profile(

                        full_name=data.get(
                            "full_name",
                            ""
                        ),

                        phone_number=data.get(
                            "phone_number",
                            ""
                        ),

                        registration_number=data.get(
                            "registration_number",
                            ""
                        ),

                        course=data.get(
                            "course",
                            ""
                        ),

                        year_of_study=int(
                            data.get(
                                "year_of_study",
                                1
                            )
                        ),

                        user_id=user.id

                    )


                    db.session.add(profile)



                db.session.commit()



                return jsonify({

                    "message":
                    "Student created",

                    "student_id":
                    user.id

                }),201



            except Exception as e:


                db.session.rollback()


                return jsonify({

                    "message":
                    str(e)

                }),500






        students_list=[]



        users = User.query.filter_by(
            role="student"
        ).all()



        for user in users:


            profile = Profile.query.filter_by(
                user_id=user.id
            ).first()



            students_list.append({

                "id":
                user.id,

                "full_name":
                profile.full_name
                if profile else
                user.username,

                "email":
                user.email

            })



        return jsonify(students_list),200





    # -----------------------------
    # LOGIN
    # -----------------------------

    @app.route(
        "/auth/login",
        methods=["POST","OPTIONS"]
    )
    def login():


        if request.method == "OPTIONS":

            return "",200



        try:


            data = request.get_json() or {}



            email = (
                data.get("email")
                or ""
            ).strip().lower()



            password = (
                data.get("password")
                or ""
            )



            user = User.query.filter_by(
                email=email
            ).first()




            if not user:


                role = (
                    "admin"
                    if email ==
                    "admin@jkuat.ac.ke"

                    else
                    "student"
                )



                user = User(

                    username=email.split("@")[0],

                    email=email,

                    password=password,

                    role=role

                )



                db.session.add(user)

                db.session.commit()




            elif user.password != password:


                return jsonify({

                    "message":
                    "Invalid credentials"

                }),401




            return jsonify({

                "message":
                "Login successful",

                "token":
                f"token-{user.id}",

                "role":
                user.role,

                "email":
                user.email,

                "user_id":
                user.id

            }),200




        except Exception as e:


            db.session.rollback()


            return jsonify({

                "message":
                str(e)

            }),500





    # -----------------------------
    # BOOKINGS
    # -----------------------------

    @app.route(
        "/bookings",
        methods=["GET","POST","OPTIONS"]
    )
    def bookings():

        if request.method == "OPTIONS":

            return "",200




        # STUDENT CREATES BOOKING

        if request.method == "POST":


            try:


                data=request.get_json() or {}



                booking = Booking(

                    user_id=data.get(
                        "user_id"
                    ),

                    room_id=data.get(
                        "room_id"
                    ),

                    status="Pending"

                )



                db.session.add(booking)

                db.session.commit()



                return jsonify({

                    "message":
                    "Booking request submitted",

                    "booking_id":
                    booking.id

                }),201




            except Exception as e:


                db.session.rollback()



                return jsonify({

                    "message":
                    str(e)

                }),500





        # ADMIN VIEWS BOOKINGS


        bookings_list = Booking.query.all()



        return jsonify([


            {

                "id":
                booking.id,


                "student":
                booking.user.username,


                "room":
                booking.room.room_number,


                "status":
                booking.status,


                "user_id":
                booking.user_id,


                "room_id":
                booking.room_id

            }


            for booking in bookings_list


        ]),200







    # UPDATE BOOKING STATUS

    @app.route(
        "/bookings/<int:id>",
        methods=["PUT","OPTIONS"]
    )
    def update_booking(id):


        if request.method == "OPTIONS":

            return "",200




        booking = Booking.query.get(id)



        if not booking:


            return jsonify({

                "message":
                "Booking not found"

            }),404




        data=request.get_json() or {}



        booking.status = data.get(

            "status",

            booking.status

        )



        db.session.commit()



        return jsonify({

            "message":
            "Booking updated",

            "status":
            booking.status

        }),200

    return app


# -----------------------------
    # END OF APP CREATION
    # -----------------------------

    return app



# Create Flask application instance
app = create_app()



# Run application
if __name__ == "__main__":

    app.run(
        debug=True
    )