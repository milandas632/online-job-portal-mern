# Deployment Guide: GitHub + MongoDB Atlas + Render

## A. Upload the project to GitHub

1. Create a new **public** GitHub repository named `online-job-portal-mern`.
2. Extract the ZIP supplied with this project.
3. Open a terminal inside the extracted project folder.
4. Run:

```bash
git init
git add .
git commit -m "Initial full-stack job portal project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/online-job-portal-mern.git
git push -u origin main
```

You can also use **Add file → Upload files** in GitHub, but Git is more reliable for a multi-folder project.

## B. Create MongoDB Atlas database

1. Create a free Atlas project and cluster.
2. Create a database user.
3. In **Network Access**, allow the Render service to connect. For a classroom demo, `0.0.0.0/0` is the simplest setting; use stronger restrictions for a real production system.
4. Select **Connect → Drivers → Node.js** and copy the connection string.
5. Replace `<password>` with the database user's password and add a database name, for example:

```text
mongodb+srv://jobportal_user:PASSWORD@cluster.example.mongodb.net/jobportal?retryWrites=true&w=majority
```

## C. Deploy with Render Blueprint

1. Sign in to Render with GitHub.
2. Select **New → Blueprint**.
3. Choose the GitHub repository.
4. Render detects `render.yaml`.
5. Enter `MONGODB_URI` when prompted.
6. Deploy the service.
7. After deployment, open **Shell** and run:

```bash
npm run seed
```

## D. Confirm the deployment

Open:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/health
```

It should return a JSON response with `status: "ok"`.

Then open the root URL and test:

- Public job list
- Candidate login and application workflow
- Recruiter job creation and applicant management
- Administrator dashboard

## E. Submit to Qollabb

Paste either the GitHub repository link or the Render live-demo link in **Link of Your Work (GitHub, Live Demo)**. A GitHub repository is enough for the field, but adding the live URL to the repository README makes the submission stronger.

## F. Common deployment fixes

### MongoDB connection fails

- Confirm the Atlas username/password.
- URL-encode special characters in the password.
- Confirm the cluster network access list.
- Confirm `MONGODB_URI` is set in Render.

### Blank page after deployment

- Check that Render build completed successfully.
- Confirm `client/dist` was produced.
- Open Render logs and look for JavaScript or build errors.

### Authentication cookies do not work

- Keep `COOKIE_SECURE=true` in production.
- Access the site through its HTTPS Render URL.
- Do not open the frontend from a separate domain unless CORS and cookie settings are updated.
