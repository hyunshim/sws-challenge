from flask import Flask
from flask_cors import CORS
from extensions import db, ma
from routes import company_bp


def create_app(database_uri: str = "sqlite:///sws.sqlite3"):
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['CORS_HEADERS'] = 'Content-Type'

    db.init_app(app)
    ma.init_app(app)

    app.register_blueprint(company_bp)
    CORS(app)

    return app
