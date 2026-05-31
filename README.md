# VaultPass Backend

Secure backend API for VaultPass - Platform for Private Notes and Team Access
Built with Node.js, Express, MongoDB, JWT, and role-based access control.

## Features Implemented

- **Authentication**: Signup/Signin with bcrypt password hashing
- **Authorization**: Role-based access control for `user`, `moderator`, `admin`
- **Account Locking**: 5 failed logins in 10 min = 15 min lock
- **JWT Security**: Tokens expire in 1 hour with proper error handling
- **Suspicious Activity Logging**: Failed logins, forbidden access, deletes logged to MongoDB
- **Error Handling**: Centralized middleware for clean error responses
- **Request Logging**: Morgan for HTTP request logs

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Tokens
- bcryptjs
- dotenv, morgan

