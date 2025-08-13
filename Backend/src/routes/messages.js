const Message = require("../models/Message");

module.exports = (io) => {
  const express = require("express");
  const router = express.Router();
  const BUSINESS_NUMBER = "918329446654";

  router.get("/conversations", async (req, res) => {
    try {
      const conversations = await Message.aggregate([
        { $sort: { timestamp: -1 } },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$from", BUSINESS_NUMBER] },
                "$to",
                "$from"
              ]
            },
            lastMessage: { $first: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: {
              $cond: [
                { $ifNull: ["$lastMessage.name", false] },
                "$lastMessage.name",
                "$_id"
              ]
            },
            text: "$lastMessage.text",
            timestamp: "$lastMessage.timestamp",
            status: "$lastMessage.status"
          }
        }
      ]);
      res.json(conversations);
    } catch (err) {
      console.error("Error in /conversations:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await Message.find({
        $or: [
          { from: id, to: BUSINESS_NUMBER },
          { from: BUSINESS_NUMBER, to: id }
        ]
      }).sort({ timestamp: 1 });
      res.json(messages);
    } catch (err) {
      console.error("Error in /:id:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { from, to, text, name, status } = req.body;
      const newMessage = new Message({
        from,
        to,
        text,
        name: name || to,
        status: status || "sent",
        timestamp: new Date()
      });
      await newMessage.save();
      io.emit("messageReceived", newMessage);
      res.status(201).json(newMessage);
    } catch (err) {
      console.error("Error sending message:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.patch("/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
      await Message.updateOne({ _id: id }, { status });
      io.emit("statusUpdate", { id, status });
      res.json({ success: true });
    } catch (err) {
      console.error("Error updating status:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  return router;
};
