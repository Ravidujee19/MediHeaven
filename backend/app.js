const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require("./Routes/UserRoutes");

dotenv.config(); // Load environment variables

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5001; // Use .env PORT, fallback to 5001
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router);
app.use("/files", express.static("files"));

// Import Routes
const imageRoutes = require("./Routes/imageRoutes");
const path = require("path");
app.use("/api", imageRoutes);

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
}).catch((err) => console.log(err));

//Pdf upload
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./files')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

//Insert the model
require("./Model/PdfModel");
const pdfSchema = mongoose.model("PdfDetails");
const uplode = multer({storage})

app.post("/uplodefile", uplode.single("file"),
    async(req,res) => {
        console.log(req.file);
        const title = req.body.title;
        const pdf = req.file.filename;

        try {
            await pdfSchema.create({title: title,pdf: pdf});
            console.log("Pdf Uploaded Successfully");
            res.send({ status: 200, message: "File uploaded successfully" , pdf, url: `/files/${pdf}` });
        } catch (err){
            console.log(err);
            res.status(500).send({ status: "error", message: "File upload failed" });
        }
});

app.get("/getFile", async(req,res) => {
    try {
        const data = await pdfSchema.find({});
        res.send({status: 200, data: data}); 
    } catch (err){
        console.log(err);
        res.status(500).send({ status: "error", message: "Failed to retrieve files" });
    }
});
