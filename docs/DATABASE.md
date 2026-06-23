# Database Design

MongoDB database name: `jobportal`

## Collections

- `users`: identity, password hash, role, and account status
- `candidateprofiles`: candidate skills, education, experience, and PDF resume
- `recruiterprofiles`: company information
- `categories`: administrator-managed job categories
- `jobs`: recruiter vacancies
- `applications`: candidate applications with status history
- `savedjobs`: many-to-many saved-job relationship
- `refreshsessions`: hashed refresh tokens used for rotation and revocation

## Key relationships

- One user has one candidate or recruiter profile.
- One recruiter user creates many jobs.
- One candidate applies to many jobs.
- One job receives many applications.
- A unique compound index prevents duplicate applications for the same candidate and job.
- A unique compound index prevents the same job from being saved twice by one candidate.

## Resume design

For a portable academic demo, PDF resume data is stored as a base64 string in the candidate profile. The API limits the PDF to 2 MB. A production system should normally use private object storage and retain only the storage key in MongoDB.
