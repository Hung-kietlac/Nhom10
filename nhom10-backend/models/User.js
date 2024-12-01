const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    gender: String,
    password: String,
    dateOfBirth: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;