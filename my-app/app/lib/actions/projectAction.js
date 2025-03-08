"use server";

import { revalidatePath } from "next/cache";
import projectModel from "../models/project.model";

export async function insertProject(project) {
  try {
    const newProject = await projectModel.create(project);

    const plainProject = {
      ...newProject.toObject(),
      _id: newProject._id.toString(),
    };
    revalidatePath("/projects");

    return plainProject;
  } catch (error) {
    console.error("Error inserting project:", error);
    throw error;
  }
}

export async function updateProject(id, project) {
  try {
    await projectModel.findByIdAndUpdate(id, project);
    revalidatePath("/projects");
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export async function deleteProject(id) {
  try {
    await projectModel.findByIdAndDelete(id);
    revalidatePath("/projects");
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}
