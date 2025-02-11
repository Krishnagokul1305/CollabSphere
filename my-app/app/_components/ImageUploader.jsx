"use client";

import { useState } from "react";

export default function CustomUploader() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append(
      "operations",
      JSON.stringify({
        query: `
        mutation UploadImage($file: Upload!) {
          uploadProfileImage(file: $file)
        }
      `,
        variables: { file: null },
      })
    );
    formData.append("map", JSON.stringify({ 0: ["variables.file"] }));
    formData.append("0", file);

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data?.data?.uploadProfileImage) {
        setImageUrl(data.data.uploadProfileImage);
      } else {
        console.error("Upload failed:", data.errors);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-32 justify-center p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Upload an Image
      </h2>

      {/* Image Preview */}
      <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            className="w-full h-full object-cover"
          />
        ) : loading ? (
          <p className="text-gray-500 text-sm">Uploading...</p>
        ) : (
          <p className="text-gray-500 text-sm">No image selected</p>
        )}
      </div>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        className="mt-4 hidden"
        id="fileUpload"
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileUpload"
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        {loading ? "Uploading..." : "Choose File"}
      </label>
    </div>
  );
}
