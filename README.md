# AudioMetrics — Clinical Pure-Tone Hearing Test (Audiometry) Web Application

A full-stack clinical pure-tone audiometry system designed with medical-grade precision, Dark/Light Mode, dual-ear testing (Left Ear ✕ & Right Ear ◯), real-time Web Audio pure-tone sound generation, real-time Canvas Oscilloscope, interactive volume slider, ANSI S3.21 inverted audiogram plotting, and persistent SQLite database storage.

---

## 📁 Project Architecture & Directory Structure

```
d:\project\hearing-app\
│
├── backend\
│   ├── server.py             # Python HTTP + REST API + SQLite database server
│   └── audiometry.db         # Persistent SQLite database (users & test results)
│
└── frontend\
    ├── index.html            # Semantic HTML (Split Hero Auth + Dual-Ear Audiometry)
    ├── style.css             # Light & Dark theme clinical responsive stylesheet
    └── app.js                # Web Audio API + Canvas Oscilloscope + SVG Audiogram
```

---

## 🚀 Terminal Commands (`cmd` and `cd`)

### 1. To Open the App in Your Browser Right Now:
In your command prompt or PowerShell, run:
```cmd
start http://localhost:5000
```
*(Press **Enter** — your browser will immediately open `http://localhost:5000`!)*

### 2. If you need to restart the backend server:
```cmd
cd "d:\project\hearing-app\backend"
python server.py
```

### 3. To see any changes you make:
Just save the file and press **<kbd>Ctrl</kbd> + <kbd>F5</kbd>** in your browser to hard-refresh!

---

## 🌟 Upgraded UI Features Implemented

### 1. 🌓 Clinical Dark / Light Mode
- One-click theme toggle button in the header (☀️ / 🌙).
- High-contrast clinical dark theme with deep navy/slate backgrounds (`#0b1120`, `#131c31`), glowing cyan accents (`#38bdf8`), and calibrated grid contrast.
- Saves your preferred theme in `localStorage`.

### 2. 🏥 Split-Screen Hero Authentication Portal
- **Left Panel (Hero Showcase)**: Clinical branding, ANSI/ISO standards badge, feature highlights, and audiological precision metrics.
- **Right Panel (Interactive Portal)**:
  - Toggle tabs for **"Login"** and **"Sign Up"**.
  - Sign Up: First Name, Last Name, Age, Mobile, Email, Password, Confirm Password, Register.
  - Login: Email/Mobile, Password, Forgot Password recovery modal, Login button.
  - Quick-switch links below the form.

### 3. 🎧 Earphone Connectivity & Stereo Channel Routing
- **Clinical Ear Isolation via `StereoPannerNode`**:
  - When **Left Ear (✕)** is selected, test tones are physically routed **100% into the Left Earphone** (`pan = -1.0`).
  - When **Right Ear (◯)** is selected, test tones are physically routed **100% into the Right Earphone** (`pan = +1.0`).
  - Zero cross-talk between ears for genuine clinical validity.
- **🎧 Earphone Setup & Channel Check Modal**:
  - **Device Selector**: Automatically enumerates and detects plugged-in 3.5mm headphones, USB headsets, or Bluetooth earphones.
  - **Left Earphone Test Button**: Emits a calibrated 1000 Hz tone solely to the left earphone with real-time visual signal indicators.
  - **Right Earphone Test Button**: Emits a calibrated 1000 Hz tone solely to the right earphone.
  - **Standard Color Placement Guide**: Confirms Red is on the Right ear and Blue is on the Left ear.

### 4. 👂 Dual-Ear Testing (Left Ear ✕ & Right Ear ◯)
- Dedicated pill toggle in the session header:
  - **Left Ear**: Clinical Blue **✕** markers and solid blue line.
  - **Right Ear**: Clinical Red **◯** markers and dashed red line.
- Both ears plot simultaneously on the same clinical audiogram for immediate comparison.

### 4. 🎚️ Smooth Precision Volume Slider + Steppers
- In addition to the `[-10]`, `[-5]`, `[+5]`, `[+10]` dB steppers and quick preset chips (`10`, `20`, `30`, `40`, `50`, `60`, `70`, `80 dB`), a smooth precision range slider allows fine-grained intensity adjustment across `-10 dB to 120 dB HL`.

### 5. 🌊 Real-Time Canvas Oscilloscope Visualizer
- Connected directly to the `AudioContext` pure sinusoidal oscillator via an `AnalyserNode`.
- Displays real-time audio waveforms while the test tone is playing, with an idle ambient wave when inactive.

### 6. 📊 Dual-Ear Pure Tone Average (PTA) & Doctor's Notes
- Automated **Left Ear PTA** and **Right Ear PTA** calculations (500, 1000, 2000, 4000 Hz).
- Inter-aural asymmetry warning if threshold differences exceed 15 dB.
- **Clinician Observations Box**: Add doctor notes, otoscopy findings, and speech discrimination notes directly to the patient report.
- One-click **Print / Export PDF** formatted report.
