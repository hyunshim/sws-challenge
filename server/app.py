from flask import Flask
from flask_cors import CORS
from extensions import db, ma
from routes import company_bp


def create_app(database_uri: str = "sqlite:///sws.sqlite3"):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['CORS_HEADERS'] = 'Content-Type'

    # Set cross-origin resource sharing so that the client can communicate with the serverr
    CORS(app)

    # Initialise SQLAlchemy database
    db.init_app(app)
    # Initialise Schema
    ma.init_app(app)

    # Use a blueprint to group company endpoints to increase organisation of code
    app.register_blueprint(company_bp)

    return app
