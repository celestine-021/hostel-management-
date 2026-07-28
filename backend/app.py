from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

try:
    from .config import Config
    from .models import db
except ImportError:
    from config import Config
    from models import db


migrate = Migrate()
api = Api()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

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