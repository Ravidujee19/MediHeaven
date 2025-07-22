const express = require("express");
const router = express.Router();
const blogImageUpload = require("../Middleware/blogImageUpload"); // <- updated import
const blogController = require("../Controllers/blogController");

router.post("/", blogImageUpload.single("image"), blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlog);
router.put("/:id", blogImageUpload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
