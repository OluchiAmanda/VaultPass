const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const logSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    email: String,
    ipAddress: String,
    details: Object,
    timestamp: {type: Date, default: Date.now}
});

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum:["Moderator", "Admin", "User"],
        default: "User"
    },

    loginAttempts:{type: Number, default: 0},
    lockedUntil: Date
}, {timestamps: true, versionKey: false});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.isLocked = function () {
    return this.lockedUntil && this.lockedUntil > Date.now();
};

userSchema.methods.incrementLoginAttempts = function () {

    if (this.isLocked()) {
        return this.updateOne({ $inc: { loginAttempts: 1 } });
    }

    if (this.loginAttempts + 1 >= 5) {
        const now = Date.now();
        this.lockedUntil = Date.now() + 10 * 60 * 1000; // Lock for 10 minutes
        this.lockedUntil= Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
    }
    return this.updateOne({ $inc: { loginAttempts: 1 } });

    userSchema.methods.resetLoginAttempts = function () {
    this.loginAttempts = 0;
    this.lockedUntil = null;
    return this.save();}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
};

const User = mongoose.model('User', userSchema);
const Log = mongoose.model('Log', logSchema);

module.exports = { User, Log }};