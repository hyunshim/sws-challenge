"""
Group all extensions to the back-end in one place so that it's easier to check what extensions have been made.
Also helps with circular imports.
"""
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()

