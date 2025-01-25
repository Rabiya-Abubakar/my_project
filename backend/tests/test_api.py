import pytest
from app import app

# Fixture to create a test client
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

# ---------------------- LOGIN ----------------------

# Test for successful login with valid credentials (User role)
def test_login_user(client):
    data = {
        "email": "user@example.com",
        "password": "password123"
    }
    response = client.post('/api/v1/auth/login', json=data)
    
    assert response.status_code == 200
    assert "token" in response.json
    assert response.json["role"] == "user"
