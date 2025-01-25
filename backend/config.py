import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('postgresql://user-superuser:superuser123@localhost/myproject')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'your_jwt_secret_key'  # Change this to a secret key of your choice
