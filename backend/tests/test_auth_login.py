import sys
import unittest

sys.path.insert(0, ".")

from backend.app import app
from backend.models import db
from backend.models.hostels import Hostel
from backend.models.rooms import Room
from backend.models.users import User


class AuthLoginTests(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config.update(TESTING=True, SQLALCHEMY_DATABASE_URI="sqlite:///:memory:")
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.drop_all()
        db.create_all()

        user = User(
            username="admin",
            email="admin@jkuat.ac.ke",
            password="admin123",
            role="admin",
        )
        db.session.add(user)
        db.session.commit()

        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_login_success(self):
        response = self.client.post(
            "/auth/login",
            json={"email": "admin@jkuat.ac.ke", "password": "admin123"},
        )

        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertIn("token", payload)
        self.assertEqual(payload["role"], "admin")

    def test_login_creates_default_admin_when_database_is_empty(self):
        db.session.query(User).delete()
        db.session.commit()

        response = self.client.post(
            "/auth/login",
            json={"email": "admin@jkuat.ac.ke", "password": "admin123"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(User.query.filter_by(email="admin@jkuat.ac.ke").first() is not None)

    def test_login_creates_user_for_new_email_and_password(self):
        response = self.client.post(
            "/auth/login",
            json={"email": "student@example.com", "password": "mypass123"},
        )

        self.assertEqual(response.status_code, 200)
        created_user = User.query.filter_by(email="student@example.com").first()
        self.assertIsNotNone(created_user)
        self.assertEqual(created_user.password, "mypass123")

    def test_hostel_creation_endpoint(self):
        response = self.client.post(
            "/hostels",
            json={
                "name": "Hostel C",
                "location": "Main Campus",
                "description": "New hostel",
                "gender": "mixed",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Hostel.query.count(), 1)

    def test_room_creation_endpoint(self):
        hostel = Hostel(name="Hostel C", location="Main Campus", gender="mixed")
        db.session.add(hostel)
        db.session.commit()

        response = self.client.post(
            "/rooms",
            json={
                "hostel_id": hostel.id,
                "room_number": "C101",
                "capacity": 4,
                "occupied_spaces": 0,
                "price": 17000,
                "status": "available",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Room.query.count(), 1)

    def test_student_creation_endpoint(self):
        response = self.client.post(
            "/students",
            json={
                "full_name": "Alice Otieno",
                "email": "alice@example.com",
                "password": "student123",
                "phone_number": "0711223344",
                "registration_number": "EN01-0101-2024",
                "course": "Computer Science",
                "year_of_study": 3,
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(User.query.filter_by(email="alice@example.com").first() is not None)

    def test_student_creation_rejects_duplicate_registration_number(self):
        self.client.post(
            "/students",
            json={
                "full_name": "Alice Otieno",
                "email": "alice@example.com",
                "password": "student123",
                "phone_number": "0711223344",
                "registration_number": "EN01-0101-2024",
                "course": "Computer Science",
                "year_of_study": 3,
            },
        )

        duplicate_response = self.client.post(
            "/students",
            json={
                "full_name": "Bob Otieno",
                "email": "bob@example.com",
                "password": "student123",
                "phone_number": "0711223345",
                "registration_number": "EN01-0101-2024",
                "course": "Mathematics",
                "year_of_study": 2,
            },
        )

        self.assertEqual(duplicate_response.status_code, 409)
        self.assertIn("already exists", duplicate_response.get_json()["message"])


if __name__ == "__main__":
    unittest.main()
