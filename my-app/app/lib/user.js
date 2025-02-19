import { revalidatePath } from "next/cache";
import userModel from "./models/user.model";
import dbConnect from "./db";

export async function forgotPassword(email) {
  try {
    const response = await fetch(`/api/auth/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updatePassword(password, newPassword) {
  try {
    const response = await fetch(
      `${process.env.API_BASE}/users/update-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password, newPassword }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signup(data) {
  try {
    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function updateUser(id, userData) {
  try {
    console.log("Updating user:", id, userData);

    const res = await fetch(`/api/user/${id}`, {
      method: "PUT",
      body: userData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    revalidatePath("/profile");
    return data.user;
  } catch (error) {
    console.error("Error updating user:", error.message);
  }
}

export async function resetPassword(token, password) {
  try {
    const response = await fetch(`/api/auth/resetPassword/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserById(id) {
  try {
    await dbConnect();
    const data = await userModel.findById(id);
    if (!data) throw new Error("User not found");
    return data;
  } catch (error) {
    console.log(error);
  }
}
