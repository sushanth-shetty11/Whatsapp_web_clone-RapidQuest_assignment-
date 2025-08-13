const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/whatsapp";
const COLLECTION = "processed_messages";

const msgSchema = new mongoose.Schema({}, { strict: false });
const Message = mongoose.model(COLLECTION, msgSchema);

async function processPayloads(payloadDir) {
  await mongoose.connect(MONGO_URI);
  const files = fs.readdirSync(payloadDir).filter(f => f.endsWith(".json"));
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(payloadDir, file), "utf8"));
    const entry = data?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (value?.messages) {
      const msg = value.messages[0];
      const contact = value.contacts?.[0];
      await Message.updateOne(
        { meta_msg_id: msg.id },
        {
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

    if (value?.statuses) {
      for (const status of value.statuses) {
        await Message.updateOne(
          { meta_msg_id: status.id },
          { status: status.status }
        );
        console.log(`Updated status for message: ${status.id} → ${status.status}`);
      }
    }
  }
  mongoose.connection.close();
  console.log("✅ All payloads processed.");
}

processPayloads(path.join(__dirname, "payloads"));
