const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = mongoose.connect("mongodb+srv://yashramdeo19003:proses729@cluster0.ddkorde.mongodb.net/");
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;