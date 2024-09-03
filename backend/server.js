const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Load Atlas URI
require('dotenv').config();

// Create an Express application
const app = express();
// Set the port for the server
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors(
    {
        origin: [process.env.API],
        methods: ["POST", "GET", "DELETE", "PATCH"],
        credentials: true
    }
));  // Enable CORS for all routes
app.use(express.json());  // Parse JSON request bodies

// MongoDB connection setup
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection successfully established");
})

// Route setup
const algorithmsRouter = require('./routes/algorithms');
const usersRouter = require('./routes/users');

app.use('/algorithms', algorithmsRouter);
app.use('/users', usersRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
