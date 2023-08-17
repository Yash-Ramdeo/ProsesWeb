const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Database/MongoDB.js");
const userRoutes = require("./Routes/UserRoutes.js");
const cors = require("cors");

dotenv.config(); //To use .env variables
connectDB();
const app = express();

app.use(express.json()); // to accept JSON data

app.use(cors()); //To handle proxy

app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
