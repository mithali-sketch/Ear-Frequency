"""
AudioMetrics Clinical Hearing Test Web App - Backend Server
Standard Python HTTP + SQLite REST API (Zero external pip dependencies required)
Supports:
  - User Registration & Authentication (hashed passwords, token-based sessions)
  - Hearing Test Results Storage & History
  - Static Frontend File Serving
  - Full CORS Support for API clients
"""

import sys
import os
import json
import sqlite3
import hashlib
import secrets
import mimetypes
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Server configuration
PORT = 5000
DB_FILE = os.path.join(os.path.dirname(__file__), "audiometry.db")
FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))

# In-memory session token store: { token: { user_id, email, name, role, expires } }
SESSIONS = {}

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        age INTEGER NOT NULL,
        mobile TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # Hearing test results table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS hearing_tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        test_mode TEXT DEFAULT 'Air Conduction — Headphones',
        ear TEXT DEFAULT 'Left Ear (X)',
        thresholds_json TEXT NOT NULL,
        pta_score REAL,
        diagnosis TEXT,
        notes TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
    """)
    
    conn.commit()
    conn.close()
    print("[DB] SQLite database initialized successfully at:", DB_FILE)

def hash_password(password: str) -> str:
    # SHA-256 with salt
    salt = "hear_well_audiometrics_salt_2026"
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

class AudiometryRequestHandler(BaseHTTPRequestHandler):

    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def _send_json(self, status_code: int, data: dict):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self._set_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def _read_body_json(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            return {}
        raw_data = self.wfile if False else self.rfile.read(content_length)
        try:
            return json.loads(raw_data.decode('utf-8'))
        except Exception:
            return {}

    def _get_authenticated_user(self):
        auth_header = self.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:].strip()
            if token in SESSIONS:
                return SESSIONS[token]
        return None

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")
        if not path:
            path = "/"

        # API: System Status & Available Endpoints
        if path == "/api":
            return self._send_json(200, {
                "status": "online",
                "service": "AudioMetrics Audiometry REST API",
                "version": "1.0",
                "endpoints": {
                    "POST /api/auth/register": "Register a new patient account",
                    "POST /api/auth/login": "Authenticate patient & obtain session token",
                    "POST /api/auth/logout": "End current session",
                    "GET /api/auth/me": "Retrieve currently authenticated patient profile",
                    "POST /api/tests": "Save an audiogram test result to SQLite",
                    "GET /api/tests": "Retrieve audiogram test history for the logged-in patient"
                }
            })

        # API: Current user info
        elif path == "/api/auth/me":
            user_session = self._get_authenticated_user()
            if not user_session:
                return self._send_json(401, {"error": "Unauthorized. Please log in."})
            return self._send_json(200, {"user": user_session})

        # API: Hearing tests list
        elif path == "/api/tests":
            user_session = self._get_authenticated_user()
            if not user_session:
                return self._send_json(401, {"error": "Unauthorized. Please log in."})
            
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, test_date, test_mode, ear, thresholds_json, pta_score, diagnosis, notes 
                FROM hearing_tests 
                WHERE user_id = ? 
                ORDER BY test_date DESC
            """, (user_session["id"],))
            rows = cursor.fetchall()
            conn.close()

            results = []
            for r in rows:
                results.append({
                    "id": r["id"],
                    "test_date": r["test_date"],
                    "test_mode": r["test_mode"],
                    "ear": r["ear"],
                    "thresholds": json.loads(r["thresholds_json"]),
                    "pta_score": r["pta_score"],
                    "diagnosis": r["diagnosis"],
                    "notes": r["notes"]
                })
            return self._send_json(200, {"tests": results})

        # Unrecognized API route
        elif path.startswith("/api"):
            return self._send_json(404, {"error": f"API endpoint '{path}' not found."})

        # Static file server (frontend)
        else:
            self._serve_static(parsed.path)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        body = self._read_body_json()

        # API: Sign Up / Register
        if path == "/api/auth/register":
            first_name = body.get("firstName", "").strip()
            last_name = body.get("lastName", "").strip()
            age = body.get("age")
            mobile = body.get("mobile", "").strip()
            email = body.get("email", "").strip().lower()
            password = body.get("password", "")
            confirm_password = body.get("confirmPassword", "")

            # Validation
            if not all([first_name, last_name, age, mobile, email, password]):
                return self._send_json(400, {"error": "All fields are required."})
            
            if password != confirm_password:
                return self._send_json(400, {"error": "Passwords do not match."})
            
            if len(password) < 6:
                return self._send_json(400, {"error": "Password must be at least 6 characters."})

            try:
                age = int(age)
                if age < 1 or age > 120:
                    return self._send_json(400, {"error": "Please enter a valid age."})
            except ValueError:
                return self._send_json(400, {"error": "Age must be a valid number."})

            conn = get_db_connection()
            cursor = conn.cursor()
            try:
                pwd_hash = hash_password(password)
                cursor.execute("""
                    INSERT INTO users (first_name, last_name, age, mobile, email, password_hash)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (first_name, last_name, age, mobile, email, pwd_hash))
                conn.commit()
                user_id = cursor.lastrowid
                
                # Auto-generate session token
                token = secrets.token_hex(24)
                user_data = {
                    "id": user_id,
                    "firstName": first_name,
                    "lastName": last_name,
                    "age": age,
                    "mobile": mobile,
                    "email": email
                }
                SESSIONS[token] = user_data

                conn.close()
                return self._send_json(201, {
                    "message": "Registration successful!",
                    "token": token,
                    "user": user_data
                })
            except sqlite3.IntegrityError as e:
                conn.close()
                err_msg = str(e).lower()
                if "email" in err_msg:
                    return self._send_json(409, {"error": "An account with this email already exists."})
                elif "mobile" in err_msg:
                    return self._send_json(409, {"error": "An account with this mobile number already exists."})
                return self._send_json(409, {"error": "Account already exists with these credentials."})

        # API: Login
        elif path == "/api/auth/login":
            identifier = body.get("identifier", "").strip().lower()
            password = body.get("password", "")

            if not identifier or not password:
                return self._send_json(400, {"error": "Email/Mobile and Password are required."})

            conn = get_db_connection()
            cursor = conn.cursor()
            pwd_hash = hash_password(password)

            cursor.execute("""
                SELECT id, first_name, last_name, age, mobile, email, password_hash 
                FROM users 
                WHERE (LOWER(email) = ? OR mobile = ?)
            """, (identifier, identifier))
            user = cursor.fetchone()
            conn.close()

            if not user or user["password_hash"] != pwd_hash:
                return self._send_json(401, {"error": "Invalid email/mobile or password."})

            token = secrets.token_hex(24)
            user_data = {
                "id": user["id"],
                "firstName": user["first_name"],
                "lastName": user["last_name"],
                "age": user["age"],
                "mobile": user["mobile"],
                "email": user["email"]
            }
            SESSIONS[token] = user_data

            return self._send_json(200, {
                "message": "Login successful!",
                "token": token,
                "user": user_data
            })

        # API: Logout
        elif path == "/api/auth/logout":
            auth_header = self.headers.get("Authorization", "")
            if auth_header.startswith("Bearer "):
                token = auth_header[7:].strip()
                SESSIONS.pop(token, None)
            return self._send_json(200, {"message": "Logged out successfully."})

        # API: Save Test Result
        elif path == "/api/tests":
            user_session = self._get_authenticated_user()
            if not user_session:
                return self._send_json(401, {"error": "Unauthorized. Please log in."})

            thresholds = body.get("thresholds", {})
            pta_score = body.get("ptaScore")
            diagnosis = body.get("diagnosis", "Normal")
            notes = body.get("notes", "")
            test_mode = body.get("testMode", "Air Conduction — Headphones")
            ear = body.get("ear", "Left Ear (X)")

            if not thresholds:
                return self._send_json(400, {"error": "Threshold data cannot be empty."})

            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO hearing_tests (user_id, test_mode, ear, thresholds_json, pta_score, diagnosis, notes)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (user_session["id"], test_mode, ear, json.dumps(thresholds), pta_score, diagnosis, notes))
            conn.commit()
            test_id = cursor.lastrowid
            conn.close()

            return self._send_json(201, {
                "message": "Audiogram test results saved successfully.",
                "testId": test_id
            })

        # Unrecognized API endpoint
        else:
            return self._send_json(404, {"error": f"Endpoint {path} not found."})

    def _serve_static(self, path: str):
        if path == "/" or path == "":
            path = "/index.html"

        safe_path = os.path.normpath(path.lstrip("/"))
        file_path = os.path.join(FRONTEND_DIR, safe_path)

        # Security check: must reside inside FRONTEND_DIR
        if not file_path.startswith(FRONTEND_DIR):
            self.send_response(403)
            self.end_headers()
            self.wfile.write(b"Forbidden")
            return

        if os.path.isfile(file_path):
            mime_type, _ = mimetypes.guess_type(file_path)
            if not mime_type:
                mime_type = "application/octet-stream"
            
            with open(file_path, "rb") as f:
                content = f.read()

            self.send_response(200)
            self.send_header("Content-Type", mime_type)
            self.send_header("Content-Length", str(len(content)))
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(content)
        else:
            self.send_response(404)
            self.send_header("Content-Type", "text/plain")
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(b"File Not Found")

def run():
    init_db()
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, AudiometryRequestHandler)
    print("==================================================")
    print("  AudioMetrics Hearing Test Server is Running!    ")
    print(f"  Frontpage:    http://localhost:{PORT}           ")
    print(f"  API Overview: http://localhost:{PORT}/api       ")
    print(f"  Frontend Dir: {FRONTEND_DIR}                    ")
    print("==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == "__main__":
    run()
