import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageUploder() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      fetchImages();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image");
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      setImages(response.data.data);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  return (
    <div>
      <h1>Image Upload and Display</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Uploaded Images</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((img) => (
          <div key={img._id} style={{ margin: "10px" }}>
            <img src={img.imageUrl} alt={img.imageName} width="150" />
            <p>{img.imageName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploder;
