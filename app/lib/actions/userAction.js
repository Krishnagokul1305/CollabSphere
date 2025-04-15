"use server";

import { getServerSession } from "next-auth";
import dbConnect from "../db";
import { authOptions } from "../auth";
import userModel from "../models/user.model";
import { revalidatePath } from "next/cache";
import { fileUpload } from "../fileUpload";

export async function updateUser(id, formData) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      throw new Error("Unauthorized");
    }

    const updatedFields = {};

    for (const [key, value] of formData.entries()) {
      if (key === "file" && value.size > 0) {
        updatedFields["avatar"] = await fileUpload(
          value,
          `${session?.user?.id}-${Date.now()}-${session?.user?.name}`,
          "users"
        );
      } else if (
        value !== null &&
        value !== undefined &&
        (typeof value !== "string" || value.trim() !== "")
      ) {
        updatedFields[key] = value;
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      throw new Error("At least one valid field is required");
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(id, updatedFields, {
        new: true,
        runValidators: true,
      })
      .lean();

    if (!updatedUser) {
      throw new Error("User not found");
    }

    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating user:", error);
    // throw new Error(error.message || "Internal Server Error");
  }
}
