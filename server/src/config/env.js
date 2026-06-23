import dotenv from 'dotenv';

dotenv.config();

const required = ['MONGODB_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI,
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessMinutes: Number(process.env.ACCESS_TOKEN_MINUTES || 15),
  refreshDays: Number(process.env.REFRESH_TOKEN_DAYS || 7),
  cookieSecure: String(process.env.COOKIE_SECURE || 'false') === 'true',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
