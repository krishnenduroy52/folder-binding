import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getImages, addImage } from "../utils/db";
import { useSwipeable } from "react-swipeable";

const FolderView = () => {
  const { folderId } = useParams();
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImages(Number(folderId));
      setImages(images);
    };
    fetchImages();
  }, [folderId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadImage = async () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      await addImage(Number(folderId), e.target.result);
      const images = await getImages(Number(folderId));
      setImages(images);
    };
    reader.readAsDataURL(selectedFile);
  };

  const openFullscreen = (index) => {
    setFullscreenImageIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenImageIndex(null);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (
        fullscreenImageIndex !== null &&
        fullscreenImageIndex < images.length - 1
      ) {
        setFullscreenImageIndex((prevIndex) => prevIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (fullscreenImageIndex !== null && fullscreenImageIndex > 0) {
        setFullscreenImageIndex((prevIndex) => prevIndex - 1);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true, // Allow swipe gestures with mouse dragging for desktop
  });

  return (
    <div>
      <h1>Images</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((img, index) => (
          <img
            key={img.id}
            src={img.imageData}
            alt="uploaded"
            style={{ width: "100px", margin: "5px", cursor: "pointer" }}
            onClick={() => openFullscreen(index)}
          />
        ))}
      </div>

      {fullscreenImageIndex !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          {...handlers} // Add swipe handlers to the fullscreen container
        >
          <img
            src={images[fullscreenImageIndex].imageData}
            alt="fullscreen"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          <button
            onClick={closeFullscreen}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "transparent",
              color: "white",
              fontSize: "24px",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderView;
