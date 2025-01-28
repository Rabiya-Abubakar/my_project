import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')  # Using DATABASE_URL from .env
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY') cd # Make sure JWT_SECRET_KEY is in .env