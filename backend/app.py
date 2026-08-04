from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from backend.models import db
from backend.config import Config

def create_app():
    app = Flask(__name__)

    # Enable full CORS across all origins, headers, and HTTP methods
    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    app.config.from_object(Config)
    db.init_app(app)
    Migrate(app, db)

    # ROUTES 

    # Make sure OPTIONS is explicitly included in the methods list!
    @app.route("/auth/login", methods=["POST", "OPTIONS"])
    def login():
        # Handle CORS preflight explicitly if needed
        if request.method == "OPTIONS":
            return "", 200

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
        }), 200

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)