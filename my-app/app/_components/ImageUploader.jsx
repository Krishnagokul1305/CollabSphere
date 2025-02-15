"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImageUploader() {
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
    <div className=" p-3   w-full md:mt-5">
      <h1 className="text-lg font-semibold">Profile Photo</h1>
      <div className="mt-3 space-y-5 flex items-center flex-col rounded-lg">
        <div className="bg-sidebar w-full p- flex items-center justify-center rounded-lg">
          <div className="relative w-full h-60  rounded-lg overflow-hidden border bg-white">
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Profile photo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="w-full flex items-center gap-4 justify-end">
          <Button variant="secondary" className="px-5" size="lg">
            Choose you Avatar
          </Button>
          <Button className="px-5" size="lg">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
