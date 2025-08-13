const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("🟢 Client connected", socket.id);

  socket.on("typing", ({ to }) => {
    socket.broadcast.emit("typing", { to });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected", socket.id);
  });
});

app.use("/api/messages", require("./routes/Messages")(io));

app.get("/", (req, res) => res.send("Backend running 🚀"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
