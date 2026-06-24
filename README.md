# Online Job Portal System Using Full Stack Development Frameworks

A complete MERN-stack BCA major project that connects job seekers with recruiters through a secure online platform. The application includes candidate, recruiter, and administrator roles, job search and filtering, resume management, online applications, saved jobs, dashboards, role-based access control, and realistic demo data for academic presentation.

## Live Project

**Live Website:**
https://online-job-portal-mern.onrender.com

**GitHub Repository:**
https://github.com/milandas632/online-job-portal-mern

## Student Details

**Student:** Milan Das
**University ID:** 023BCA110231
**Programme:** Bachelor of Computer Applications (BCA)
**Program Code:** ONBC201
**Academic Session:** 2023–2026
**Guide/Mentor:** Dr. Vandana Sivaraj

## Project Overview

CareerBridge is an online job portal developed using the MERN stack. It allows job seekers to create profiles, upload resumes, search for jobs, save vacancies, and submit applications. Recruiters can create company profiles, publish vacancies, manage jobs, review applicants, and update application statuses. Administrators can manage users, job listings, and job categories.

The live website also contains realistic demonstration data so that the platform looks complete during academic evaluation.

## Demo Data Included

The deployed application currently includes:

* 10 demo job-seeker accounts
* 10 demo recruiter accounts
* 10 demo company profiles
* 20 demo job vacancies
* 20 demo applications
* Multiple application statuses such as applied, reviewing, shortlisted, rejected, and hired
* Default categories for software development, data and analytics, design, marketing, finance, and human resources

The demo-account passwords are generated randomly and are not displayed publicly. The demo data is intended only to make the academic project appear realistic and complete.

## Features

### Job Seeker

* Register and sign in securely
* Create and update a professional candidate profile
* Add headline, location, phone number, skills, and professional summary
* Upload a PDF resume
* Search jobs by keyword, location, category, and employment type
* View complete job details
* Save suitable jobs
* Apply for jobs with an optional cover letter
* Track submitted applications
* Withdraw applications
* View application-status updates

### Recruiter

* Register as a recruiter
* Create and update a company profile
* Add company name, website, location, and description
* Post new job vacancies
* Add job title, category, salary, employment type, skills, and deadline
* Edit, close, and delete vacancies
* View published jobs
* Review candidates who applied for each job
* Access candidate profile and resume information
* Update application status to reviewing, shortlisted, rejected, or hired
* View recruiter dashboard statistics

### Administrator

* Access an administrator dashboard
* View system statistics
* Manage registered users
* Activate or deactivate user accounts
* Remove unsuitable job listings
* Add and manage job categories
* Monitor the application platform

## Technology Stack

### Frontend

* React 19
* Vite 8
* React Router
* Axios
* Responsive CSS

### Backend

* Node.js 22
* Express.js 5
* MongoDB Atlas
* Mongoose

### Authentication and Security

* JWT access and refresh authentication
* HTTP-only authentication cookies
* bcrypt password hashing
* Role-based access control
* Helmet security headers
* Request rate limiting
* CORS configuration
* Input validation
* Centralized error handling

### Deployment

* GitHub for source-code hosting
* MongoDB Atlas for cloud database hosting
* Render for full-stack deployment

## Project Structure

```text
.
├── client/                         React frontend
├── server/                         Express API and MongoDB models
│   └── src/
│       ├── populateDemoData.js     Safe demo-data population script
│       └── server.js               Server startup and optional demo population
├── docs/                           API and database documentation
├── .github/workflows/ci.yml        GitHub Actions build check
├── render.yaml                     Render deployment configuration
├── package.json                    Root scripts
├── DEPLOYMENT.md                   Deployment documentation
└── README.md                       Project documentation
```

## Run the Project Locally

### 1. Prerequisites

Install the following:

* Node.js 22 or newer
* npm
* MongoDB Community Server or a MongoDB Atlas account

### 2. Clone the Repository

```bash
git clone https://github.com/milandas632/online-job-portal-mern.git
```

Open the project directory:

```bash
cd online-job-portal-mern
```

### 3. Install Dependencies

Install root dependencies:

```bash
npm install
```

Install frontend and backend dependencies:

```bash
npm run install:all
```

### 4. Configure Environment Variables

Copy the example environment file:

```bash
cp server/.env.example server/.env
```

On Windows PowerShell:

```powershell
Copy-Item server/.env.example server/.env
```

Open `server/.env` and configure:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_secure_access_secret
JWT_REFRESH_SECRET=your_secure_refresh_secret
NODE_ENV=development
PORT=5000
POPULATE_DEMO_DATA=false
```

Do not upload the real `.env` file to GitHub.

### 5. Start the Development Servers

```bash
npm run dev
```

The application will normally be available at:

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000/api`

## Demo Data Population

The project includes a safe demo-data population system in:

```text
server/src/populateDemoData.js
```

The demo data can be added by setting:

```env
POPULATE_DEMO_DATA=true
```

When the server starts with this value, it checks for and creates the demo candidates, recruiters, company profiles, jobs, categories, and applications.

After the population finishes successfully, change the value back to:

```env
POPULATE_DEMO_DATA=false
```

This avoids unnecessary database checks during future restarts.

The population script is designed to avoid deleting or duplicating existing production data.

## Important Seed Warning

The project may also contain a traditional seed command:

```bash
npm run seed
```

Do not run this command on the existing live production database because it may reset or replace existing jobs, applications, saved jobs, sessions, and sample records.

Use the safer `POPULATE_DEMO_DATA` method for adding demonstration content without deleting existing data.

## MongoDB Atlas Configuration

To connect the application to MongoDB Atlas:

1. Create a MongoDB Atlas project.
2. Create a free MongoDB cluster.
3. Create a database user.
4. Add the required IP address to the Network Access list.
5. For Render deployment, allow access using `0.0.0.0/0`.
6. Copy the Node.js connection string.
7. Replace the password placeholder with the database-user password.
8. Store the complete connection string as `MONGODB_URI` in Render.

Default job categories are created automatically when required.

## Deploy on Render

The project is deployed as one full-stack Render Web Service. Express serves the built React frontend in production.

### 1. Connect the Repository

In Render:

1. Select **New**.
2. Select **Web Service**.
3. Connect the GitHub account.
4. Select the `online-job-portal-mern` repository.
5. Select the `main` branch.

### 2. Service Configuration

**Runtime:**

```text
Node
```

**Root directory:**

Leave blank.

**Build command:**

```bash
rm -f package-lock.json server/package-lock.json client/package-lock.json && npm install --prefix server --omit=dev --no-package-lock --registry=https://registry.npmjs.org/ && npm install --prefix client --include=dev --no-package-lock --registry=https://registry.npmjs.org/ && npm run build --prefix client
```

**Start command:**

```bash
npm run start
```

### 3. Render Environment Variables

Add:

```text
MONGODB_URI
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
NODE_ENV
NODE_VERSION
POPULATE_DEMO_DATA
```

Recommended values:

```text
NODE_ENV=production
NODE_VERSION=22.22.3
POPULATE_DEMO_DATA=false
```

Use strong and different secret values for:

```text
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
```

Do not place database passwords, JWT secrets, or private environment values inside the GitHub repository.

### 4. Deploy

Click **Deploy Web Service**.

After deployment, the application is available at:

```text
https://online-job-portal-mern.onrender.com
```

The free Render instance may enter sleep mode after inactivity. The first request after inactivity can therefore take around 30–60 seconds.

More deployment information is available in [DEPLOYMENT.md](DEPLOYMENT.md).

## Tested Workflow

The following workflow has been tested successfully on the live application:

1. Candidate registration and sign-in
2. Candidate-profile creation
3. PDF-resume upload
4. Recruiter registration and sign-in
5. Company-profile creation
6. Job-vacancy publication
7. Job-category loading
8. Job search and filtering
9. Job-details display
10. Candidate job application
11. Cover-letter submission
12. Recruiter applicant review
13. Application-status management
14. Demo-data population
15. MongoDB Atlas database connectivity
16. Render production deployment

## Security Notes

* Never commit the real `.env` file.
* Keep MongoDB credentials and JWT secrets in Render environment variables.
* Do not display demo-account passwords publicly.
* Use strong and unique JWT secrets.
* Avoid running reset or seed commands against the live database.
* Change any exposed password or secret before using the application for real users.
* Demo records are intended only for academic demonstration.

## Academic Note

This repository contains the source code for the BCA major project titled **Online Job Portal System Using Full Stack Development Frameworks**.

The system was developed and deployed for academic demonstration and evaluation. The live website contains realistic sample jobs, recruiters, candidates, and applications to demonstrate the complete workflow.

Screenshots, workflows, and measured test results included in the final project report should be captured from the running application rather than invented.

## Author

**Milan Das**
Bachelor of Computer Applications
Chandigarh University
University ID: 023BCA110231
Academic Session: 2023–2026
::: 
