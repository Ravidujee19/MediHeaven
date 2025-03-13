const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require("./Routes/UserRoutes");

dotenv.config(); // Load environment variables

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5001; // Use .env PORT, fallback to 5001
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
