import { z } from 'zod';

const mongoId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid identifier');

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(80),
    email: z.email().transform((value) => value.toLowerCase()),
    password: z.string().min(8).max(72),
    role: z.enum(['candidate', 'recruiter']),
    companyName: z.string().trim().min(2).max(150).optional()
  }),
  params: z.object({}),
  query: z.object({})
}).refine((data) => data.body.role !== 'recruiter' || Boolean(data.body.companyName), {
  message: 'Company name is required for recruiter registration',
  path: ['body', 'companyName']
});

export const loginSchema = z.object({
  body: z.object({ email: z.email(), password: z.string().min(1) }),
  params: z.object({}),
  query: z.object({})
});

export const changePasswordSchema = z.object({
  body: z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(8).max(72) }),
  params: z.object({}),
  query: z.object({})
});

export const jobSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(120),
    description: z.string().trim().min(30).max(5000),
    location: z.string().trim().min(2).max(120),
    category: mongoId,
    employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']),
    experienceLevel: z.enum(['Entry', 'Mid', 'Senior', 'Lead']).default('Entry'),
    salaryMin: z.coerce.number().min(0).default(0),
    salaryMax: z.coerce.number().min(0).default(0),
    skills: z.array(z.string().trim().min(1).max(50)).max(20).default([]),
    deadline: z.coerce.date()
  }).refine((body) => !body.salaryMax || body.salaryMax >= body.salaryMin, {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['salaryMax']
  }),
  params: z.object({}),
  query: z.object({})
});

export const jobStatusSchema = z.object({
  body: z.object({ status: z.enum(['open', 'closed']) }),
  params: z.object({ id: mongoId }),
  query: z.object({})
});

export const applicationSchema = z.object({
  body: z.object({ coverLetter: z.string().trim().max(2500).default('') }),
  params: z.object({ jobId: mongoId }),
  query: z.object({})
});

export const applicationStatusSchema = z.object({
  body: z.object({ status: z.enum(['reviewing', 'shortlisted', 'rejected', 'hired']) }),
  params: z.object({ id: mongoId }),
  query: z.object({})
});
