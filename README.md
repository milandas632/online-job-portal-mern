# Online Job Portal System Using Full Stack Development Frameworks

A complete MERN-stack BCA major project that connects job seekers with recruiters through a secure online platform. The application includes candidate, recruiter, and administrator roles, job search and filtering, resume management, online applications, saved jobs, dashboards, and role-based access control.

## Live Project

**Live Website:**
https://online-job-portal-mern.onrender.com

## Student Details

**Student:** Milan Das
**University ID:** 023BCA110231
**Programme:** Bachelor of Computer Applications (BCA)
**Program Code:** ONBC201
**Academic Session:** 2023–2026
**Guide/Mentor:** Dr. Vandana Sivaraj

## Features

### Job Seeker

* Register and sign in securely
* Create and update a professional candidate profile
* Upload a PDF resume
* Search jobs by keyword, location, category, and employment type
* View complete job details
* Save suitable jobs
* Apply for jobs with an optional cover letter
* Track submitted applications
* Withdraw applications
* View application status updates

### Recruiter

* Register as a recruiter
* Create and update a company profile
* Post new job vacancies
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
* Modern responsive CSS

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
* MongoDB Atlas for the cloud database
* Render for full-stack application deployment

## Project Structure

```text
.
├── client/                    React frontend
├── server/                    Express API and MongoDB models
├── docs/                      API and database documentation
├── .github/workflows/ci.yml   GitHub Actions build check
├── render.yaml                Render deployment configuration
├── package.json               Root scripts
├── DEPLOYMENT.md              Deployment documentation
└── README.md                  Project documentation
```

## Run the Project Locally

### 1. Prerequisites

Install the following software:

* Node.js 22 or newer
* npm
* MongoDB Community Server or a MongoDB Atlas account

### 2. Download the Project

Clone the GitHub repository:

```bash
git clone https://github.com/milandas632/online-job-portal-mern.git
```

Open the project directory:

```bash
cd online-job-portal-mern
```

### 3. Install Dependencies

Install the root dependencies:

```bash
npm install
```

Install the frontend and backend dependencies:

```bash
npm run install:all
```

### 4. Configure Environment Variables

Copy the example environment file:

```bash
cp server/.env.example server/.env
```

On Windows PowerShell, use:

```powershell
Copy-Item server/.env.example server/.env
```

Open `server/.env` and configure the following values:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_secure_access_secret
JWT_REFRESH_SECRET=your_secure_refresh_secret
NODE_ENV=development
PORT=5000
```

Do not upload the real `.env` file to GitHub.

### 5. Start the Development Servers

Run:

```bash
npm run dev
```

The application will normally be available at:

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000/api`

## Optional Sample Data

The repository contains a seed command that can create sample data for local development and testing:

```bash
npm run seed
```

The seed command should only be used on a local or disposable test database.

**Do not run the seed command on the existing live production database**, because it may reset or replace existing jobs, applications, saved jobs, sessions, and other project data.

Demo account credentials are intentionally not displayed publicly in this README or on the sign-in page.

## MongoDB Atlas Configuration

To connect the application to MongoDB Atlas:

1. Create a MongoDB Atlas project.
2. Create a free MongoDB cluster.
3. Create a database user.
4. Add the required IP address to the Network Access list.
5. For Render deployment, allow access using `0.0.0.0/0`.
6. Copy the Node.js connection string.
7. Replace the password placeholder with the database-user password.
8. Store the complete connection string as the `MONGODB_URI` environment variable in Render.

Default job categories are created automatically when the server starts if they are not already available.

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

Use the following configuration:

**Runtime:**

```text
Node
```

**Root directory:**

Leave this field blank.

**Build command:**

```bash
rm -f package-lock.json server/package-lock.json client/package-lock.json && npm install --prefix server --omit=dev --no-package-lock --registry=https://registry.npmjs.org/ && npm install --prefix client --include=dev --no-package-lock --registry=https://registry.npmjs.org/ && npm run build --prefix client
```

**Start command:**

```bash
npm run start
```

### 3. Render Environment Variables

Add the following environment variables:

```text
MONGODB_URI
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
NODE_ENV
NODE_VERSION
```

Recommended values:

```text
NODE_ENV=production
NODE_VERSION=22.22.3
```

Generate strong and different values for:

```text
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
```

Do not place database passwords, JWT secrets, or private environment-variable values inside the GitHub repository.

### 4. Deploy

Click **Deploy Web Service**.

After the build and deployment are completed, the service will be available at:

```text
https://online-job-portal-mern.onrender.com
```

The free Render instance may enter sleep mode after inactivity. The first request after inactivity can therefore take approximately 30–60 seconds to load.

More deployment information is available in [DEPLOYMENT.md](DEPLOYMENT.md).

## Tested Workflow

The following workflow has been tested on the live application:

1. Candidate registration and sign-in
2. Candidate-profile creation
3. PDF-resume upload
4. Recruiter registration and sign-in
5. Company-profile creation
6. Job-vacancy publication
7. Job search and job-details display
8. Candidate job application
9. Cover-letter submission
10. Recruiter applicant review
11. Application-status management
12. MongoDB Atlas database connectivity
13. Render production deployment

## Security Notes

* Never commit the real `.env` file.
* The `.gitignore` file excludes environment files.
* Keep MongoDB credentials and JWT secrets inside Render environment variables.
* Do not display test-account passwords publicly.
* Use strong and unique JWT secrets.
* Use a MongoDB database user with only the permissions required by the application.
* Avoid running database-reset or seed commands against the live production database.
* Change any exposed password or secret before using the project for real users.

## Academic Note

This repository contains the source code for the BCA major project titled **Online Job Portal System Using Full Stack Development Frameworks**.

The system was developed and deployed for academic demonstration and evaluation. Screenshots, workflows, and measured test results included in the final project report should be captured from the running application rather than invented.

## Author

**Milan Das**
Bachelor of Computer Applications
Chandigarh University
University ID: 023BCA110231
Academic Session: 2023–2026
