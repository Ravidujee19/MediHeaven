const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageName: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Image", ImageSchema);
