// src/app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messages"); // file name should match exactly (lowercase 'messages')

dotenv.config();
connectDB(); // connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", messageRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
