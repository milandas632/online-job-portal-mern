import mongoose from 'mongoose';

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';
  let details = error.details;

  if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid resource identifier';
  }

  if (error?.code === 11000) {
    statusCode = 409;
    message = 'A record with the same unique value already exists';
    details = error.keyValue;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Database validation failed';
    details = Object.values(error.errors).map((item) => item.message);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  res.status(statusCode).json({ success: false, message, details });
}
