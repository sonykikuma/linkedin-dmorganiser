const mongoose = require("mongoose");

const dmSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  labels: [String], // e.g., ['sales', 'recruiting', 'genuine']
  isSpam: { type: Boolean, default: false },
});

module.exports = mongoose.model("DM", dmSchema);
