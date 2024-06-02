import React, { useState } from "react";

const ImageUploader = ({ onImageSelect, onPreviewUrlChange, value }) => {
  const [width] = useState(800);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;
    onImageSelect(imageFile);

    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = width / image.width;
        canvas.width = width;
        canvas.height = image.height * ratio;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const newImageUrl = canvas.toDataURL("image/jpeg", 0.98);
        setPreviewUrl(newImageUrl);

        if (onPreviewUrlChange) {
          onPreviewUrlChange(newImageUrl);
        }

        const imageFileWithActualName = urlToFile(imageFile.name, newImageUrl);
        onImageSelect(imageFileWithActualName);
      };
    };
  };

  const urlToFile = (filename, url) => {
    const arr = url.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = atob(arr[1]);
    const n = data.length;
    const dataArr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      dataArr[i] = data.charCodeAt(i);
    }

    return new File([dataArr], filename, { type: mime });
  };

  return (
    <div>
      <input
        type="file"
        id="inputImage"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
      />
      {(previewUrl || value) && (
        <img
          src={previewUrl || value}
          alt="Preview"
          style={{ width: "60px", borderRadius: "6px" }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
