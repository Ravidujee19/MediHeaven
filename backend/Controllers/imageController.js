const Image = require("../Model/Images");

exports.uploadImage = async (req, res) => {
  try {
    const imageName = req.file.originalname;
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newImage = new Image({ imageName, imageUrl });
    await newImage.save();

    res.status(200).json({ success: true, message: "Image uploaded successfully", data: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Image upload failed", error });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch images", error });
  }
};
