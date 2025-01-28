from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Define Role Model
class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    users = db.relationship('User', backref='role', lazy=True)

    def __repr__(self):
        return f'<Role {self.name}>'

# Define User Model with a role association
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Hashed password
    role = db.Column(db.String(50), nullable=False, default='user')  # Adding a role field

    def __repr__(self):
        return f'<User {self.email}>'
