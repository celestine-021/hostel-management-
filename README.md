1# JKUAT Hostel Management System

A Flask-based backend for a hostel management system for JKUAT students and administrators. The project is currently structured around a modular backend with controllers, models, and a database seeding setup.

## Project Overview

This system is intended to support:
- student registration and authentication
- profile management
- hostel and room management
- booking management
- amenity management
- role-based access for students and administrators

## Current Project Structure

```text
jkuat_hostel_management/
├── app.py
├── requirements.txt
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── controllers/
│   │   ├── amenities_controllers.py
│   │   ├── auth_controllers.py
│   │   ├── bookings_controllers.py
│   │   ├── hostels_controllers.py
│   │   ├── profiles_controllers.py
│   │   ├── rooms_controllers.py
│   │   └── users_controllers.py
│   ├── models/
│   │   ├── amenities.py
│   │   ├── auth.py
│   │   ├── bookings.py
│   │   ├── hostels.py
│   │   ├── profiles.py
│   │   ├── rooms.py
│   │   ├── users.py
│   │   └── __init__.py
│   └── seed.py
├── database/
│   └── erd.md
└── docs/
    └── erd.mmd
```

## Features Implemented So Far

The project currently includes:
- Flask application entry points
- modular backend controllers for key resources
- model modules for users, profiles, hostels, rooms, bookings, and amenities
- database seeding support
- ERD documentation for the system

## Setup Instructions

### 1. Create a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the application

From the project root:

```bash
python app.py
```

## Environment Variables

The backend expects a configuration file with environment variables such as:
- `DATABASE_URL`
- `JWT_SECRET_KEY`

Create a `.env` file in the project root or backend folder as needed.

## Database and ERD

An ERD for the project has been created in:
- [database/erd.md](database/erd.md)
- [docs/erd.mmd](docs/erd.mmd)

## Notes

This README reflects the current state of the project structure and implementation progress. Some modules and routes may still be under development or being finalized.

## Future Work

Planned improvements include:
- completing the Flask app wiring
- connecting controllers to the main app
- finishing authentication and authorization flow
- testing CRUD operations
- linking the frontend to the backend
