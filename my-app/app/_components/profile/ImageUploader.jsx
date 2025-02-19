"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ImageUploader({ setValue, image, isLoading = false }) {
  const [preview, setPreview] = useState(image || ""); // Initialize with default image

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        const objectURL = URL.createObjectURL(uploadedFile); // Create preview URL

        setPreview(objectURL);
        setValue("profileImage", uploadedFile);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  return (
    <div className="flex w-full flex-col md:flex-row items-center gap-10">
      {/* Profile Picture */}
      <div className="md:basis-[20%] w-[100%]">
        {!isLoading ? (
          <div className="md:w-24 md:h-24 h-full w-[100%] md:rounded-full rounded-lg overflow-hidden border">
            {preview ? (
              <img
                src={preview}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center min-h-[100px] justify-center bg-gray-200">
                <Image className="text-gray-500" size={24} />
              </div>
            )}
          </div>
        ) : (
          <Skeleton className="md:w-24 md:h-24 h-36 w-[100%] md:rounded-full rounded-lg overflow-hidden border" />
        )}
      </div>

      {/* Upload Box */}
      <div
        {...getRootProps()}
        className="flex flex-col w-full items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition 
        hover:border-gray-400"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col gap-3 items-center text-center">
          <Upload size={20} className="text-gray-500" />
          <span className="font-medium text-gray-700">
            <span className="font-semibold">Click here</span> to upload your
            file or drag.
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Supported Format: SVG, JPG, PNG (500kb-1MB each)
        </p>
      </div>
    </div>
  );
}
