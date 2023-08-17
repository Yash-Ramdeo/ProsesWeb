const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: { type: "String", required: true, unique: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    address: { type: "String", required: true },
    phone: { type: "String", required: true, unique: true },
    pic: { type: "String", default: "./user-icon.png" },
}, {
    timestamps: true
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User;