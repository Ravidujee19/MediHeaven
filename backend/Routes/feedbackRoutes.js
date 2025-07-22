// const express = require("express");
// const router = express.Router();
// const Feedback = require("../Model/Feedback");

// // POST - Submit Feedback
// router.post("/", async (req, res) => {
//   try {
//     const feedback = new Feedback(req.body);
//     await feedback.save();
//     res.status(201).json({ status: "success", message: "Feedback submitted!" });
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     res.status(500).json({ status: "error", message: "Failed to save feedback." });
//   }
// });

// // GET - Retrieve All Feedback
// router.get("/", async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find();
//     res.status(200).json(feedbacks);
//   } catch (error) {
//     console.error("Error fetching feedback:", error);
//     res.status(500).json({ message: "Failed to fetch feedback." });
//   }
// });

// // DELETE - Delete Feedback by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     await Feedback.findByIdAndDelete(req.params.id);
//     res.status(200).json({ status: "success", message: "Feedback deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting feedback:", error);
//     res.status(500).json({ message: "Failed to delete feedback." });
//   }
// });

// // PUT - Update Feedback by ID
// router.put("/:id", async (req, res) => {
//   try {
//     await Feedback.findByIdAndUpdate(req.params.id, req.body);
//     res.status(200).json({ status: "success", message: "Feedback updated successfully." });
//   } catch (error) {
//     console.error("Error updating feedback:", error);
//     res.status(500).json({ message: "Failed to update feedback." });
//   }
// });

// module.exports = router;

//new 
const express = require("express");
const router = express.Router();
const Feedback = require("../Model/Feedback");

// POST - Submit Feedback
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ status: "success", message: "Feedback submitted!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ status: "error", message: "Failed to save feedback." });
  }
});

// GET - Retrieve All Feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Failed to fetch feedback." });
  }
});

// DELETE - Delete Feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", message: "Feedback deleted successfully." });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Failed to delete feedback." });
  }
});

// PUT - Update Feedback by ID
router.put("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: "success", message: "Feedback updated successfully." });
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Failed to update feedback." });
  }
});

module.exports = router;
