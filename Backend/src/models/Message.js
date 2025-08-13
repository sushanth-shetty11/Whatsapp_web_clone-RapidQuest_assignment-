const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  from: String,
  to: String,
  name: String,
  text: String,
  timestamp: Date,
  status: String
});

module.exports = mongoose.model("Message", MessageSchema);
