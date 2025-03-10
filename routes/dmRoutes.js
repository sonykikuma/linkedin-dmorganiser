const express = require("express");
const DM = require("../models/DM");
const router = express.Router();

// Get all DMs
router.get("/", async (req, res) => {
  try {
    const dms = await DM.find();
    res.json(dms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a DM (for testing/seeding data)
router.post("/", async (req, res) => {
  const dm = new DM({
    sender: req.body.sender,
    message: req.body.message,
    priority: req.body.priority,
    labels: req.body.labels,
    isSpam: req.body.isSpam,
  });

  try {
    const newDM = await dm.save();
    res.status(201).json(newDM);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a DM (e.g., priority, labels, isSpam)
router.patch("/:id", async (req, res) => {
  try {
    const dm = await DM.findById(req.params.id);
    if (!dm) {
      return res.status(404).json({ message: "Cannot find DM" });
    }

    // Update fields based on request body
    if (req.body.priority != null) {
      dm.priority = req.body.priority;
    }
    if (req.body.isSpam != null) {
      dm.isSpam = req.body.isSpam;
    }
    if (req.body.labels != null) {
      dm.labels = req.body.labels;
    }

    const updatedDM = await dm.save();
    res.json(updatedDM);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
