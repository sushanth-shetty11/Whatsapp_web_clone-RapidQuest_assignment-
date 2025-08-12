const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Message = require("../models/Message");

dotenv.config();

async function processPayloads() {
  await connectDB();

  const payloadDir = path.join(__dirname, "../../payloads");
  const files = fs.readdirSync(payloadDir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const payloadPath = path.join(payloadDir, file);
    const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));

    const entry = payload.metaData.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    // New messages
    if (value?.messages) {
      const msg = value.messages[0];
      const contact = value.contacts?.[0];

      await Message.updateOne(
        { id: msg.id },
        {
          id: msg.id,
          meta_msg_id: msg.id,
          wa_id: contact?.wa_id,
          name: contact?.profile?.name,
          from: msg.from,
          to: value.metadata?.display_phone_number,
          timestamp: new Date(Number(msg.timestamp) * 1000),
          text: msg.text?.body || "",
          status: "sent"
        },
        { upsert: true }
      );

      console.log(`Inserted/updated message: ${msg.id}`);
    }

    // Status updates
    if (value?.statuses) {
      for (const status of value.statuses) {
        await Message.updateOne(
          { id: status.id },
          { status: status.status },
          { upsert: false }
        );
        console.log(`Updated status for message: ${status.id} → ${status.status}`);
      }
    }
  }

  mongoose.connection.close();
}

processPayloads();
