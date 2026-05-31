const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

const checkAccountLock = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.isLocked()) {
        return res.status(403).json({ message: "Account is locked" });
    }
    next();
};

const logSuspiciousActivity = async (userId, action, details) => {
    await Log.create({
        action,
        user: req.user._id,
        ipAddress: req.ip,
        details: req.originalUrl,
    });

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(err);
    res.status(statusCode).json({ message: "Internal server error" });
};

const notFoundHandler = (req, res, next) => {
    res.status(404).json({ message: "Not found" });
};

module.exports = {
    authMiddleware,
    authorizeRole,
    checkAccountLock,
    logSuspiciousActivity,
    errorHandler,
    notFoundHandler
};
};