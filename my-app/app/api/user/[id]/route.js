import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import userModel from "@/app/lib/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
// import cloudinary from "@/app/utils/Uploader";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const formData = await req.formData();
    const updatedFields = {};

    for (const [key, value] of formData.entries()) {
      // if (key === "file" && value.size > 0) {
      //   const arrayBuffer = await value.arrayBuffer();
      //   const buffer = Buffer.from(arrayBuffer);
      //   const uploadResponse = await new Promise((resolve, reject) => {
      //     cloudinary.uploader
      //       .upload_stream(
      //         {
      //           folder: "avatars",
      //           transformation: [{ width: 200, height: 200, crop: "fill" }],
      //         },
      //         (error, result) => {
      //           if (error) reject(error);
      //           else resolve(result);
      //         }
      //       )
      //       .end(buffer);
      //   });
      //   updatedFields["avatar"] = uploadResponse.secure_url;
      // } else if (
      //   value !== null &&
      //   value !== undefined &&
      //   (typeof value !== "string" || value.trim() !== "")
      // ) {
      //   updatedFields[key] = value;
      // }
    }

    if (Object.keys(updatedFields).length === 0) {
      return NextResponse.json(
        { message: "At least one valid field is required" },
        { status: 400 }
      );
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
