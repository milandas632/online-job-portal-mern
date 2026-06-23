# API Summary

Base path: `/api`

## Authentication

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/auth/register` | Public | Register candidate or recruiter |
| POST | `/auth/login` | Public | Sign in and set secure cookies |
| POST | `/auth/refresh` | Public-cookie | Rotate refresh session |
| POST | `/auth/logout` | Authenticated | Revoke current refresh session |
| GET | `/auth/me` | Authenticated | Return current user and profile |
| PATCH | `/auth/change-password` | Authenticated | Change password |

## Jobs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/jobs` | Public | Search and paginate open jobs |
| GET | `/jobs/:id` | Public | Read a job |
| POST | `/jobs` | Recruiter | Create a job |
| PUT | `/jobs/:id` | Owner recruiter/admin | Update a job |
| PATCH | `/jobs/:id/status` | Owner recruiter/admin | Open or close a job |
| DELETE | `/jobs/:id` | Owner recruiter/admin | Delete a job |
| GET | `/jobs/recruiter/mine` | Recruiter | Recruiter's jobs |
| POST | `/jobs/:id/save` | Candidate | Save a job |
| DELETE | `/jobs/:id/save` | Candidate | Remove saved job |
| GET | `/jobs/candidate/saved` | Candidate | Candidate's saved jobs |

## Applications

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/applications/jobs/:jobId` | Candidate | Apply to job |
| GET | `/applications/mine` | Candidate | Candidate applications |
| PATCH | `/applications/:id/withdraw` | Candidate owner | Withdraw application |
| GET | `/applications/recruiter` | Recruiter | Applications for own jobs |
| PATCH | `/applications/:id/status` | Recruiter job owner | Update application status |

## Profiles

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/profiles/candidate` | Candidate | Candidate profile |
| PUT | `/profiles/candidate` | Candidate | Update candidate profile |
| POST | `/profiles/candidate/resume` | Candidate | Upload base64 PDF resume |
| GET | `/profiles/candidate/:userId/resume` | Recruiter/admin | Download candidate resume |
| GET | `/profiles/recruiter` | Recruiter | Recruiter profile |
| PUT | `/profiles/recruiter` | Recruiter | Update recruiter profile |

## Categories and administration

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/categories` | Public | List categories |
| POST | `/categories` | Admin | Add category |
| DELETE | `/categories/:id` | Admin | Delete unused category |
| GET | `/admin/stats` | Admin | Dashboard totals |
| GET | `/admin/users` | Admin | Paginated users |
| PATCH | `/admin/users/:id/status` | Admin | Activate/deactivate user |
| GET | `/admin/jobs` | Admin | Paginated jobs |
| DELETE | `/admin/jobs/:id` | Admin | Remove job |
