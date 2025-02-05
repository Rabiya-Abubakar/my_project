from flask import Flask, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
import jwt
import datetime
import os
from dotenv import load_dotenv
from flask_swagger_ui import get_swaggerui_blueprint
from models import db, User, Parcel, Role 
from flask_cors import CORS

# Load environment variables from the .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Load the database URI and secret key from environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

if not app.config['SECRET_KEY']:
    raise ValueError("No JWT_SECRET_KEY set for Flask application.")

# Initialize the SQLAlchemy db object
db.init_app(app)
migrate = Migrate(app, db)

SWAGGER_URL = '/swagger'  # URL for accessing Swagger UI
API_URL = '/static/swagger.json'  # URL for Swagger JSON
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': "Parcel Management API"}
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Helper function to generate JWT token
def generate_jwt_token(user_id, email, role):
    payload = {
        "user_id": user_id,
        "email": email,
        "role": role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm="HS256")
    return token


@app.route('/')
def home():
    # return "Backend is running"
    return redirect(url_for('swagger_ui.show'))


@app.route('/api/v1/auth/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        token = generate_jwt_token(user.id, email, user.role.name)
        return jsonify({
            "message": "Login successful",
            "token": token,
            "user_id": user.id,
            "role": user.role.name
        }), 200

    return jsonify({"message": "Invalid credentials"}), 401
# logout
@app.route('/api/v1/auth/logout', methods=['POST'])
def logout_user():
    return jsonify({"message": "Logout successful"}), 200


@app.route('/api/v1/auth/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role_name = data.get('role', 'user')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email is already registered"}), 400

    # Check if the role exists, if not, create it
    role = Role.query.filter_by(name=role_name).first()
    if not role:
        role = Role(name=role_name)
        db.session.add(role)
        db.session.commit()

    # Generate User or Admin ID
    if role_name == 'user':
        last_user = User.query.filter(User.id.like('U%')).order_by(User.id.desc()).first()
        new_user_id = f'U{int(last_user.id[1:]) + 1}' if last_user else 'U1'
    elif role_name == 'admin':
        last_admin = User.query.filter(User.id.like('A%')).order_by(User.id.desc()).first()
        new_user_id = f'A{int(last_admin.id[1:]) + 1}' if last_admin else 'A1'
    else:
        return jsonify({"error": "Invalid role"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(id=new_user_id, email=email, password=hashed_password, role_id=role.id)  # Explicitly setting the ID

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "role": role_name, "user_id": new_user_id}), 201




@app.route('/api/v1/users', methods=['GET'])
def get_users():
    users = [
        {"email": user.email, "role": user.role.name}
        for user in User.query.all()
    ]
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
        return jsonify({"error": "All fields are required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    parcel = Parcel(
        origin_pin=origin_pin,
        destination_pin=destination_pin,
        weight_kg=weight_kg,
        description=description,
        user_id=user_id
    )

    db.session.add(parcel)
    db.session.commit()

    return jsonify({"message": "Parcel created successfully", "parcel": {
        "id": parcel.id,
        "origin_pin": parcel.origin_pin,
        "destination_pin": parcel.destination_pin,
        "weight_kg": parcel.weight_kg,
        "description": parcel.description,
        "status": parcel.status
    }}), 201


@app.route('/api/v1/users/<string:user_id>/parcels', methods=['GET'])
def get_user_parcels(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    parcels = Parcel.query.filter_by(user_id=user_id).all()
    return jsonify({
        "parcels": [{
            "id": parcel.id,
            "origin_pin": parcel.origin_pin,
            "destination_pin": parcel.destination_pin,
            "weight_kg": parcel.weight_kg,
            "description": parcel.description,
            "status": parcel.status
        } for parcel in parcels]
    }), 200


@app.route('/api/v1/parcels/<int:parcel_id>', methods=['GET'])
def get_parcel_by_id(parcel_id):
    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({"error": "Parcel not found"}), 404

    return jsonify({
        "parcel": {
            "id": parcel.id,
            "origin_pin": parcel.origin_pin,
            "destination_pin": parcel.destination_pin,
            "weight_kg": parcel.weight_kg,
            "description": parcel.description,
            "status": parcel.status
        }
    }), 200


@app.route('/api/v1/parcels/<int:parcel_id>/cancel', methods=['PUT'])
def cancel_parcel(parcel_id):
    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({"error": "Parcel not found"}), 404

    parcel.status = 'canceled'
    db.session.commit()

    return jsonify({"message": "Parcel has been canceled", "parcel": {
        "id": parcel.id,
        "status": parcel.status
    }}), 200


@app.route('/api/v1/parcels/<int:parcel_id>/status', methods=['PUT'])
def update_parcel_status(parcel_id):
    data = request.get_json()
    new_status = data.get('status')
    role = data.get('role')

    if role != 'admin':
        return jsonify({"error": "Only admins can change the parcel status"}), 403

    if not new_status:
        return jsonify({"error": "New status is required"}), 400

    # Restrict status updates to "canceled" or "delivered" only
    allowed_statuses = ["canceled", "delivered"]
    if new_status not in allowed_statuses:
        return jsonify({"error": f"Invalid status. Allowed values: {allowed_statuses}"}), 400

    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({"error": "Parcel not found"}), 404

    parcel.status = new_status
    db.session.commit()

    return jsonify({"message": "Parcel status updated successfully", "parcel": {
        "id": parcel.id,
        "status": parcel.status
    }}), 200

# endpoint for updating parcel details
@app.route('/api/v1/parcel/<int:parcel_id>', methods=['PUT'])
def update_parcel(parcel_id):
    data = request.get_json()
    
    parcel = Parcel.query.get(parcel_id)
    if not parcel:
        return jsonify({"error": "Parcel not found"}), 404

    # Allow updating only certain fields
    if 'origin_pin' in data:
        parcel.origin_pin = data['origin_pin']
    if 'destination_pin' in data:
        parcel.destination_pin = data['destination_pin']
    if 'weight_kg' in data:
        parcel.weight_kg = data['weight_kg']
    if 'description' in data:
        parcel.description = data['description']

    db.session.commit()

    return jsonify({
        "message": "Parcel details updated successfully",
        "parcel": {
            "id": parcel.id,
            "origin_pin": parcel.origin_pin,
            "destination_pin": parcel.destination_pin,
            "weight_kg": parcel.weight_kg,
            "description": parcel.description,
            "status": parcel.status
        }
    }), 200

# main
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
