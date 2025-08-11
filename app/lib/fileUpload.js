"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "./s3";

export async function fileUpload(file, name, folder = "users") {
  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `${folder}/${name ? name : `${Date.now()}-${file.name}`}`;
  const params = {
    Bucket: process.env.NEXT_AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type,
    ContentDisposition: "attachment",
  };

  const command = new PutObjectCommand(params);
  try {
    await s3.send(command);
    const url = `https://${params.Bucket}.s3.${process.env.NEXT_AWS_REGION}.amazonaws.com/${key}`;
    return url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
