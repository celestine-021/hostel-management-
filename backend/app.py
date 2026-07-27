from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

try:
    from .config import Config
except ImportError:
    from config import Config


db = SQLAlchemy()
migrate = Migrate()
api = Api()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    jwt.init_app(app)
    CORS(app)

    @app.route("/")
    def home():
        return {
            "message": "JKUAT Hostel Management System API is running!"
        }

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)