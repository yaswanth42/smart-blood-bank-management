# 🩸 Smart Blood Bank Management System (BBMS)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB?logo=react)](https://react.dev/)
[![NodeJS](https://img.shields.io/badge/Backend-Node.js%20v22%20%2B%20Express%205-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)](https://vercel.com/)

An enterprise-grade, digital health platform designed to modernize and streamline blood donations, hospital emergency requests, donor eligibility tracking, and inventory management. By replacing manual paperwork with a structured digital workflow, **Smart BBMS** connects **Donors**, **Hospitals**, **Blood Labs**, and **System Administrators** into a unified real-time ecosystem.

---

## 📌 Executive Summary

### The Challenge
Blood banks and hospitals traditionally suffer from fragmented records, manual documentation, and delayed communication during critical emergencies. Key issues include:
- **No real-time visibility** into localized blood group stocks.
- **Critical delays** when hospitals place emergency blood requests.
- **Donor tracking errors** leading to premature or unsafe donation intervals.
- **Lack of a unified audit trail** for verifying medical facility credentials.

### The Solution
**Smart BBMS** provides a centralized, role-based platform that digitizes the complete blood supply lifecycle:
1. **Automated Donor Eligibility Engine**: Enforces a strict 90-day cooldown interval between blood donations based on medical algorithms.
2. **Emergency Hospital-to-Lab Request Pipeline**: Enables hospitals to send instant blood requests directly to blood laboratories with status tracking (`Pending` ➔ `Accepted` / `Rejected`).
3. **Admin Verification System**: Document verification workflow for onboarded hospitals and blood labs before granting access.
4. **Blood Camp & Community Drives**: Coordinate, schedule, and track attendance at blood donation drives.

---

## 🏛️ System Architecture

```
                       +-------------------------------+
                       |    React 19 + Vite Frontend   |
                       | (Responsive SPA + Tailwind v4)|
                       +---------------+---------------+
                                       |
                                 REST API (JWT)
                                       |
                       +---------------+---------------+
                       |  Node.js + Express 5 Backend  |
                       |  (Vercel Serverless / Node)   |
                       +---------------+---------------+
                                       |
                   +-------------------+-------------------+
                   |                   |                   |
        +----------v----------+ +------v------+ +----------v----------+
        |  MongoDB Atlas DB   | | JWT Auth    | | Swagger OpenAPI 3.0 |
        | (Mongoose Schemas)  | | Middleware  | | (/api/doc)         |
        +---------------------+ +-------------+ +---------------------+
```

---

## 👥 Ecosystem Roles & Key Features

### 🛡️ 1. System Administrator (`/admin`)
- **Facility Credential Verification**: Review registration documents (registration numbers, licensing proofs) submitted by new hospitals and labs.
- **Approval Workflow**: Approve or reject pending facilities with custom rejection reasons.
- **Global Audit Trail & Analytics**: Real-time overview of total registered donors, verified facilities, and system login histories.

### 🏥 2. Hospitals (`/hospital`)
- **Real-Time Inventory Tracking**: Monitor internal blood unit reserves across all 8 major blood types (`A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-`).
- **Emergency Blood Request Creation**: Send targeted, high-priority blood unit requests to registered Blood Labs.
- **Request Tracking**: Real-time status updates on submitted requests (`Pending`, `Accepted`, `Rejected`).
- **Donation Camps Management**: Host, schedule, and manage blood donation camps.
- **Donor Directory**: Search verified blood donors filtered by city and blood group.

### 🔬 3. Blood Laboratories (`/lab`)
- **Stock & Unit Expiration Management**: Track individual blood unit deposits, stock additions, and expiration dates.
- **Request Fulfillment Engine**: Receive hospital blood requests, evaluate stock availability, and accept or reject requests.
- **Camp Operations**: Record actual donor turnouts and manage donation camp outcomes.

### 🩸 4. Donors (`/donor`)
- **Donor Profile & Health Tracking**: Store medical stats (age, weight, gender, blood group, ID proof).
- **Automated 90-Day Cooldown Calculator**: Dynamic virtual calculation enforcing standard 90-day intervals between donations.
- **Donation History**: Track personal donation logs, facility locations, and verified records.
- **Camp Discovery**: Search and explore upcoming blood donation camps nearby.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Frontend** | React 19, Vite 7 | Modern, high-performance Single Page Application |
| **Styling** | Tailwind CSS v4, Framer Motion | Dynamic UI design system with micro-animations |
| **Icons & UI** | Lucide React, React Hot Toast | Icon sets and notifications |
| **Routing** | React Router v7 | Client-side routing and protected route guards |
| **Backend** | Node.js v22, Express 5 | High-throughput RESTful API architecture |
| **Database** | MongoDB Atlas, Mongoose ODM | Cloud document store with strict schema validation |
| **Security** | JWT, bcryptjs (12 salt rounds) | Token authentication and password hashing |
| **Documentation** | Swagger UI Express | Interactive API docs available at `/api/doc` |
| **Deployment** | Vercel, Docker | Cloud serverless deployment & containerization |

---

## 🗄️ Database Schemas Summary

- **`Admin`**: Stores administrator profiles, superadmin roles, and hashed credentials.
- **`Donor`**: Stores donor demographics, address, medical info, last donation timestamp, and virtual `isEligible` check.
- **`Facility`**: Unified model supporting both `hospital` and `blood-lab` types, registration proofs, operating hours, and activity logs.
- **`Blood`**: Unit-level inventory records referencing either a `bloodLab` or `hospital`, blood group, quantity, and expiration date.
- **`BloodRequest`**: Inter-facility requests linking a `hospitalId` to a `labId`, requested units, blood type, status, and notes.
- **`BloodCamp`**: Event schedules containing venue, date, timing, expected vs actual donor turnouts, and status.

---

## 🚀 API Endpoint Reference

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` - Unified registration for Donors & Facilities.
- `POST /api/auth/login` - Unified login authentication returning JWT token & role.
- `GET /api/auth/profile` - Fetch current authenticated user profile.

### 🛡️ Admin Management (`/api/admin`)
- `GET /api/admin/facilities` - Fetch all facilities (filter by pending/approved).
- `PATCH /api/admin/facility/:id/status` - Approve or reject facility registration.
- `GET /api/admin/donors` - Retrieve global list of registered donors.

### 🏥 Hospital Operations (`/api/hospital`)
- `GET /api/hospital/stock` - Retrieve hospital's blood stock inventory.
- `POST /api/hospital/request` - Create a blood request to a blood lab.
- `GET /api/hospital/requests` - View status of submitted blood requests.

### 🔬 Blood Lab Operations (`/api/blood-lab`)
- `GET /api/blood-lab/stock` - Fetch blood lab inventory.
- `POST /api/blood-lab/stock` - Add or update blood stock units.
- `GET /api/blood-lab/requests` - View incoming hospital requests.
- `PATCH /api/blood-lab/request/:id` - Accept or reject a hospital blood request.

---

## 🌐 Vercel Deployment Guide

This project is pre-configured for seamless deployment to **Vercel** as a full-stack application (Vite SPA Frontend + Express Serverless API).

### Step 1: Push Project to GitHub
Ensure all code is committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure Vercel deployment and updated docs"
git push origin main
```

### Step 2: Import into Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** ➔ **"Project"**.
2. Select your repository `smart-blood-bank-management`.
3. Vercel will automatically detect `vercel.json`.

### Step 3: Configure Environment Variables
Add the following Environment Variables in the Vercel deployment settings:

| Key | Example Value | Description |
|---|---|---|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/bbms` | MongoDB Atlas Connection String |
| `JWT_SECRET` | `YOUR_SECURE_JWT_SECRET_KEY` | Secret key for signing tokens |

### Step 4: Deploy!
Click **Deploy**. Vercel will build the frontend and deploy the serverless backend API automatically.

---

## 💻 Local Development Setup

### Prerequisites
- [Node.js v22+](https://nodejs.org/)
- MongoDB Connection String (Atlas or local instance)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/yaswanth42/smart-blood-bank-management.git
cd smart-blood-bank-management

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` folder:
```env
MONGO_URI=mongodb+srv://admin:admin123@login.r8hpvmw.mongodb.net/bbms?appName=login
JWT_SECRET=BBMS_2026_Auth_Secret_Key
PORT=5000
```

Create a `.env` file in the `frontend/` folder:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Seed Admin Account
```bash
cd backend
node seedAdmin.js
```
*Default Admin Credentials:*
- **Email**: `reddy34yash@gmail.com`
- **Password**: `yash@admin`

### 4. Run Development Servers

**Backend**:
```bash
cd backend
npm start
```
*Backend runs on `http://localhost:5000`*

**Frontend**:
```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🐳 Running with Docker

Run the entire application stack using Docker Compose:

```bash
docker compose up --build
```

Access the app:
- **Frontend**: `http://localhost`
- **Backend API**: `http://localhost:3000`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Developed with ❤️ by **Yash**.
