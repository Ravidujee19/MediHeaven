// // const mongoose = require("mongoose");

// // const feedbackSchema = new mongoose.Schema({
// //   name: String,
// //   email: String,
// //   contact: String,
// //   response: String,
// //   comments: String,
// //   rating: String,
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // module.exports = mongoose.model("Feedback", feedbackSchema);

// const mongoose = require("mongoose");

// const feedbackSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Name is required"],
//     trim: true,
//     minlength: [3, "Name must be at least 3 characters"],
//     maxlength: [50, "Name must not exceed 50 characters"]
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     trim: true,
//     lowercase: true,
//     match: [ /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, "Invalid email format" ]
//   },
//   contact: {
//     type: String,
//     required: [true, "Contact number is required"],
//     match: [ /^\d{10,15}$/, "Contact must be between 10-15 digits" ]
//   },
//   response: {
//     type: String,
//     enum: ["Positive", "Neutral", "Negative"], // Restricting response types
//     required: [true, "Response is required"]
//   },
//   comments: {
//     type: String,
//     trim: true,
//     maxlength: [500, "Comments should not exceed 500 characters"]
//   },
//   rating: {
//     type: Number,
//     required: [true, "Rating is required"],
//     min: [1, "Rating must be at least 1"],
//     max: [5, "Rating cannot exceed 5"]
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Feedback", feedbackSchema);

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  contact: {
    type: String,
    required: [true, "Contact number is required"],
    match: [/^\d{10}$/, "Contact number must be exactly 10 digits and contain only numbers"]
  },
  response: {
    type: String,
    required: [true, "Response is required"],
    enum: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
    default: "Good"
  },
  comments: {
    type: String,
    trim: true,
    maxlength: [500, "Comments cannot exceed 500 characters"]
  },
  rating: {
    type: String,
    required: [true, "Rating is required"],
    enum: ["1", "2", "3", "4", "5"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
