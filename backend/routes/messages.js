const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Message = require("../models/message");

// Get messages
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add message
router.post("/", auth, async (req, res) => {
  const { text } = req.body;
  try {
    const newMessage = new Message({
      user: req.user.id,
      text,
    });
    const message = await newMessage.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
