# Online Job Portal System Using Full Stack Development Frameworks

A complete MERN-stack BCA major project that connects job seekers with recruiters. It includes candidate, recruiter, and administrator roles; job search and filtering; resume management; applications; saved jobs; dashboards; and role-based access control.

**Student:** Milan Das  
**University ID:** 023BCA110231  
**Programme:** Bachelor of Computer Applications (BCA)  
**Program Code:** ONBC201  
**Academic Session:** 2023–2026  
**Guide/Mentor:** Dr. Vandana Sivaraj

## Features

### Job seeker
- Register and sign in securely
- Create and update a professional profile
- Upload a PDF resume (stored in MongoDB for the academic demo)
- Search jobs by keyword, location, category, and employment type
- Save jobs and apply online
- Track or withdraw applications

### Recruiter
- Create a recruiter/company profile
- Post, edit, close, and delete vacancies
- Review candidates who applied to each job
- Update application status: reviewing, shortlisted, rejected, or hired
- View recruiter dashboard statistics

### Administrator
- View system statistics
- Activate or deactivate user accounts
- Remove unsuitable job listings
- Add and manage job categories

## Technology stack

- React 19 + Vite 8
- React Router
- Node.js 22 + Express 5
- MongoDB Atlas + Mongoose
- JWT access and refresh authentication using HTTP-only cookies
- bcrypt password hashing
- Helmet, rate limiting, CORS, validation, and centralized error handling
- Render deployment configuration

## Project structure

```text
.
├── client/                    React frontend
├── server/                    Express API and MongoDB models
├── docs/                      API and database documentation
├── .github/workflows/ci.yml   GitHub Actions build check
├── render.yaml                Render Blueprint
├── package.json               Root scripts
└── README.md
```

## Run locally

### 1. Prerequisites

- Node.js 22 or newer
- MongoDB Community Server, or a MongoDB Atlas connection string

### 2. Install packages

```bash
npm install
npm run install:all
```

### 3. Configure the server

Copy the example environment file:

```bash
cp server/.env.example server/.env
```

On Windows PowerShell:

```powershell
Copy-Item server/.env.example server/.env
```

Edit `server/.env` and set `MONGODB_URI`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET`.

### 4. Seed demo data

```bash
npm run seed
```

The seed command creates:

| Role | Email | Password |
|---|---|---|
| Administrator | admin@jobportal.test | Admin@123 |
| Recruiter | recruiter@jobportal.test | Recruiter@123 |
| Candidate | candidate@jobportal.test | Candidate@123 |

These are demonstration accounts only. Change or remove them before a real production launch.

### 5. Start development servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

## Deploy on Render

The repository is configured as one full-stack Render web service. Express serves the built React files in production.

1. Create a free MongoDB Atlas cluster.
2. Create a database user and copy the application connection string.
3. Push this project to a public GitHub repository.
4. In Render, select **New → Blueprint** and connect the repository.
5. Enter the `MONGODB_URI` secret when requested.
6. Deploy, then open the Render shell and run:

```bash
npm run seed
```

7. Your live link will look similar to:

```text
https://online-job-portal-milan-das.onrender.com
```

More details are available in [DEPLOYMENT.md](DEPLOYMENT.md).

## Security notes

Never commit the real `.env` file. The `.gitignore` already excludes it. Use strong, unique JWT secrets and a MongoDB user with only the permissions required by this application.

## Academic note

This repository contains the source code for the BCA project titled **Online Job Portal System Using Full Stack Development Frameworks**. Screenshots and measured test results in the final report should be captured from the running application rather than invented.
