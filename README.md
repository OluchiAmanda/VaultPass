# VaultPass Backend

Secure backend API for VaultPass — a private notes + team access platform.
Built with Node.js, Express, MongoDB, JWT, and role-based access control.

## Features Implemented

- **Authentication**: Register/Login with bcrypt password hashing
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

## Project Setup

1. **Clone repo**
```bash
git clone <your-repo-url>
cd vaultpass-backend
