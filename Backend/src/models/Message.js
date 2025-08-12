// src/models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  meta_msg_id: { type: String },
  wa_id: { type: String, required: true },
  name: { type: String },
  from: { type: String },
  to: { type: String },
  timestamp: { type: Date },
  text: { type: String },
  status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" }
}, { collection: "processed_messages" });

module.exports = mongoose.model("Message", messageSchema);
