"use client";

import { fileUpload } from "@/app/lib/fileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Spinner from "../Spinner";

function FileUploadForm() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fileUpload(formData);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-sidebar p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center  mb-6">
          Upload Your File
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block  mb-2">Choose File</label>
            <Input
              type="file"
              accept="*"
              onChange={handleFileChange}
              disabled={loading}
              className="block w-full text-sm text-black  bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              type="submit"
              disabled={loading || !file}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg py-2"
            >
              {loading ? <Spinner /> : "Upload File"}
            </Button>
          </div>
        </form>

        {loading && (
          <p className="mt-4 text-center text-gray-600">
            Uploading file, please wait...
          </p>
        )}
      </div>
    </div>
  );
}

export default FileUploadForm;
