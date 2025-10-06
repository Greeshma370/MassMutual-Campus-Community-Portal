# 🏫 MassMutual Campus Community Portal

A comprehensive **MERN-stack** portal designed to streamline the **campus recruitment process**, connecting **Students**, **Faculty**, and **Management** in a unified platform.  
It enables **job postings**, **applications**, **multi-round interview tracking**, and **role-based communication**, ensuring an efficient and transparent placement workflow for all stakeholders.

---

## 📑 Table of Contents

- [Key Features](#key-features)
- [User Roles and Actions](#user-roles-and-actions)
  - [Student](#student)
  - [Faculty](#faculty)
  - [Management](#management)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)

---

## ✨ Key Features

- **Role-Based Access Control (RBAC)** – Tailored dashboards and permissions for Students, Faculty, and Management.  
- **Job Posting with Multi-Round Structure** – Jobs can include multiple interview rounds (e.g., Aptitude Test, Technical Interview, HR Interview) with independent tracking for each stage.  
- **Centralized Application Tracking** – Students and faculty can view real-time application progress and round-specific statuses.  
- **Faculty & Management Hierarchy** – Management users can add new Faculty or Management accounts directly from the dashboard.  
- **News and Events** – Dedicated section for campus announcements, placement drives, and event updates.  
- **User Profiles** – Academic, personal, and professional details stored per user.  
- **Responsive UI** – Works seamlessly across desktop, tablet, and mobile devices.  
- **Search & Filter** – Efficiently find jobs, applicants, and announcements.  

---

## 👥 User Roles and Actions

The portal defines **three primary roles** with escalating privileges and management control.

---

### 🎓 Student

**Purpose:** For students applying to jobs and staying informed about campus updates.

**Key Actions:**
- **Authentication**
  - Register and log in to the portal.
- **Dashboard**
  - Personalized dashboard with upcoming interviews, applied jobs, and announcements.
- **Job Opportunities**
  - Browse all active job postings.
  - Search and filter by company, role, or skills.
  - View job details including **round structure, salary, and eligibility criteria**.
- **Applications**
  - Apply directly through the portal.
  - Track each application and its **round-wise status**:
    - _Pending_, _Shortlisted_, _Selected_, _Rejected_
- **Profile Management**
  - Edit personal, academic, and project details.
- **News and Events**
  - Access official announcements published by Faculty or Management.

---

### 🧑‍🏫 Faculty

**Purpose:** For professors or placement coordinators managing job postings and student applications.

**Key Actions:**
- **Authentication**
  - Register and log in to the portal.
- **Job Management**
  - Create detailed job postings with:
    - Role, Description, Eligibility, Skills, and **Interview Rounds** (e.g., Round 1 - Aptitude, Round 2 - Technical, etc.)
  - Edit or delete jobs they created.
- **Application Management**
  - View all student applications for their jobs.
  - Update overall application status or **individual round outcomes**.
- **Student Management**
  - View all registered students and their basic details.
- **News and Events**
  - Publish and manage event announcements or placement notices.
- **Profile Management**
  - View and update faculty profile.

---

### 🏢 Management

**Purpose:** For placement officers or administrators overseeing the entire system.

**Key Actions:**  
*Management has all Faculty permissions, plus elevated administrative control.*

- **Global Job Oversight**
  - View, update, or delete **any** job posting in the portal.
- **Global Application Management**
  - Access and update all student applications across all jobs.
  - Modify both **overall** and **round-level** statuses.
- **User Management**
  - View all registered users.
  - **Add new Faculty or Management users** directly from the dashboard.
  - Assign or modify roles (e.g., promote a faculty to management).
- **Global News & Events**
  - Publish and manage system-wide news, drives, or circulars.
- **Advanced Insights (Optional)**
  - Access analytics on placement performance and student participation.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

---

### 🧩 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or cloud via [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### ⚙️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/massmutual-campus-community-portal.git
   cd massmutual-campus-community-portal
Install Backend Dependencies

bash
Copy code
cd backend
npm install
Install Frontend Dependencies

bash
Copy code
cd ../frontend
npm install
Configure Environment Variables
Create a .env file in the backend folder:

bash
Copy code
PORT=5000
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=<YOUR_JWT_SECRET>
Run the Application

Start Backend:

bash
Copy code
cd backend
npm run dev
Start Frontend:

bash
Copy code
cd frontend
npm run dev
Access the Portal


🧠 Technologies Used
Layer	Technology
Frontend	React, Vite, Axios
Backend	Node.js, Express.js
Database	MongoDB with Mongoose
Authentication	JSON Web Tokens (JWT)
State Management	React Hooks, Context API
Styling	CSS Modules / TailwindCSS (optional)

🧭 System Flow Overview
Job Lifecycle Example:

Faculty/Management creates a job with multiple rounds.

Students apply for the job.

For each application:

Round 1: Aptitude Test → Shortlisted

Round 2: Technical Interview → Accepted

Round 3: HR Interview → Final Decision

Faculty/Management update statuses dynamically.

Student sees progress on their dashboard in real time.

🔮 Future Enhancements
📊 Placement analytics dashboard

🔔 Push/email notifications for application updates

🤖 Resume parsing & AI-based eligibility checks

🧾 Export student and job reports in CSV/PDF

🕵️‍♂️ Audit logs for role-based tracking
