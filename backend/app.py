from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash  # Import both functions
import jwt
import datetime
import os
from dotenv import load_dotenv
from models import User, db  # Import the User model and db from your models

# Load environment variables from the .env file
load_dotenv()

# Get the secret key from the environment variables
SECRET_KEY = os.getenv("JWT_SECRET_KEY")

if not SECRET_KEY:
    raise ValueError("No JWT_SECRET_KEY set for Flask application.")

# Initialize the Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY  # Set the app's secret key



app = Flask(__name__)

# Mock data
parcels = []
users = []
# Replace with your actual database models and logic

@app.route('/')
def home():
    return "Backend is running"



# Mock data
parcels = []
users_db = {
    "user@example.com": {
        "password": generate_password_hash("hashedpassword123"),
        "role": "user"
    },
    "admin@example.com": {
        "password": generate_password_hash("adminpassword123"),
        "role": "admin"
    }
}

# Helper function to generate JWT token
def generate_jwt_token(email, role):
    payload = {
        "email": email,
        "role": role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

@app.route('/')
def index():
    return "Backend is running"


@app.route('/api/v1/auth/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = users_db.get(email)
    if user and check_password_hash(user["password"], password):
        token = generate_jwt_token(email, user["role"])
        return jsonify({"message": "Login successful", "token": token, "role": user["role"]}), 200

    
# Simulate user validation (Replace with your DB logic)
    if email == "admin@example.com" and password == "adminpassword123" and role == "admin":
        # Simulate a token (Replace with a JWT in production)
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.payload.token"
        return jsonify({"message": "Login successful", "token": token})
    else:
        return jsonify({"message": "Invalid credentials"}), 401





@app.route('/api/v1/auth/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if email in users_db:
        return jsonify({"error": "Email is already registered"}), 400

    hashed_password = generate_password_hash(password)
    users_db[email] = {
        "password": hashed_password,
        "role": role
    }

    return jsonify({"message": "User created successfully", "role": role}), 201


@app.route('/api/v1/users', methods=['GET'])
def get_users():
    users = [{"email": email, "role": user["role"]} for email, user in users_db.items()]
    return jsonify({"users": users}), 200


@app.route('/api/v1/parcels', methods=['POST'])
def create_parcel():
    data = request.get_json()
    origin_pin = data.get('origin_pin')
    destination_pin = data.get('destination_pin')
    weight_kg = data.get('weight_kg')
    description = data.get('description')
    user_id = data.get('user_id')

    if not all([origin_pin, destination_pin, weight_kg, description, user_id]):
        return jsonify({"error": "All fields are required: origin_pin, destination_pin, weight_kg, description, user_id"}), 400

    parcel = {
        "id": len(parcels) + 1,
        "origin_pin": origin_pin,
        "destination_pin": destination_pin,
        "weight_kg": weight_kg,
        "description": description,
        "user_id": user_id,
        "status": "created"
    }
    parcels.append(parcel)
    return jsonify({"message": "Parcel created successfully", "parcel": parcel}), 201


@app.route('/api/v1/users/parcels/<int:user_id>', methods=['GET'])
def get_user_parcels(user_id):
    user_parcels = [parcel for parcel in parcels if parcel["user_id"] == user_id]
    if user_parcels:
        return jsonify({"parcels": user_parcels}), 200
    return jsonify({"error": "No parcels found for this user"}), 404


@app.route('/api/v1/parcels', methods=['GET'])
def get_all_parcels():
    if parcels:
        return jsonify({"parcels": parcels}), 200
    return jsonify({"error": "No parcels found"}), 404


@app.route('/api/v1/parcels/<int:parcelid>', methods=['GET'])
def get_parcel_by_id(parcelid):
    parcel = next((parcel for parcel in parcels if parcel["id"] == parcelid), None)
    if parcel:
        return jsonify({"parcel": parcel}), 200
    return jsonify({"error": "Parcel not found"}), 404


@app.route('/api/v1/parcels/<int:parcelid>/cancel', methods=['PUT'])
def cancel_parcel(parcelid):
    parcel = next((parcel for parcel in parcels if parcel["id"] == parcelid), None)
    if parcel:
        parcel['status'] = 'canceled'
        return jsonify({"message": "Parcel has been canceled", "parcel": parcel}), 200
    return jsonify({"error": "Parcel not found"}), 404


@app.route('/api/v1/parcels/<int:parcelid>/destination', methods=['PUT'])
def update_parcel_destination(parcelid):
    data = request.get_json()
    destination_pin = data.get('destination_pin')
    destination_description = data.get('destination_description')

    parcel = next((parcel for parcel in parcels if parcel["id"] == parcelid), None)
    if parcel:
        parcel["destination_pin"] = destination_pin
        parcel["destination_description"] = destination_description
        return jsonify({"message": "Parcel destination updated successfully", "parcel": parcel}), 200
    return jsonify({"error": "Parcel not found"}), 404


@app.route('/api/v1/parcels/<int:parcel_id>/status', methods=['PUT'])
def update_parcel_status(parcel_id):
    data = request.get_json()
    new_status = data.get('status')
    role = data.get('role')

    if role != 'admin':
        return jsonify({"error": "Only admins can change the parcel status"}), 403

    if not new_status:
        return jsonify({"error": "New status is required"}), 400

    parcel = next((parcel for parcel in parcels if parcel["id"] == parcel_id), None)
    if parcel:
        parcel["status"] = new_status
        return jsonify({"message": "Parcel status updated successfully", "parcel": parcel}), 200
    return jsonify({"error": "Parcel not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)