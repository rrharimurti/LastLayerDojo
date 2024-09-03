const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema for Each User

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, required: true, unique: true, trim: true, minlength: 1, maxlength: 50
    },
    password: {
        type: String, required: true, minlength: 6
    }
})

// Decrypt password with Bcrypt before posting to MongoDB
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;