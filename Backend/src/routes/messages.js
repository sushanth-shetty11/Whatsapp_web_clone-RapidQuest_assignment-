const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get all conversations grouped by wa_id
router.get("/conversations", async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      { $sort: { timestamp: 1 } },
      {
        $group: {
          _id: "$wa_id",
          name: { $first: "$name" },
          lastMessage: { $last: "$text" },
          lastTimestamp: { $last: "$timestamp" }
        }
      },
      { $sort: { lastTimestamp: -1 } }
    ]);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages for a specific wa_id
router.get("/:wa_id", async (req, res) => {
  try {
    const messages = await Message.find({ wa_id: req.params.wa_id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
