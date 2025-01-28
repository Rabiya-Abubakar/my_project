from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Define Role Model
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    # One-to-Many relationship with users
    users = db.relationship('User', backref='role', lazy=True)

    def __repr__(self):
        return f'<Role {self.name}>'


# Define User Model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Hashed password
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)  # Foreign key to Role table

    # One-to-Many relationship with parcels
    parcels = db.relationship('Parcel', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'


# Define Parcel Model
class Parcel(db.Model):
    __tablename__ = 'parcels'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    origin_pin = db.Column(db.String(10), nullable=False)
    destination_pin = db.Column(db.String(10), nullable=False)
    weight_kg = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), default='created', nullable=False)

    # Foreign key to User table
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f'<Parcel ID {self.id} | Origin: {self.origin_pin} | Destination: {self.destination_pin}>'
