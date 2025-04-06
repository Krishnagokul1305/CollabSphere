import cloudinary from "@/app/utils/Uploader";

export async function uploadImage(file) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    return { url: uploadResult.secure_url };
  } catch (error) {
    throw new Error(error.message);
  }
}
