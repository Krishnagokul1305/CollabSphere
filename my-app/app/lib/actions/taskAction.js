"use server";

import { revalidatePath } from "next/cache";
import taskModel from "../models/task.model";
import { fileUpload } from "../fileUpload";

export const markTaskAsCompleted = async (taskId, userId) => {
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    if (task.completedMembers.includes(userId)) {
      throw new Error("Task already marked as completed by this user");
    }

    task.completedMembers.push(userId);

    if (
      task.members.every((memberId) =>
        task.completedMembers.includes(memberId.toString())
      )
    ) {
      task.status = "completed";
    }

    await task.save();
    revalidatePath(`/projects/${task.project}/tasks/${taskId}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTask = async (formData) => {
  try {
    const fields = [
      "title",
      "description",
      "dueDate",
      "project",
      "status",
      "members",
      "priority",
      "report",
      "tag",
    ];

    const taskData = {};

    const file = formData.get("attachment");
    const projectId = formData.get("project");
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    if (file && typeof file === "object" && "arrayBuffer" in file) {
      taskData.attachment = await fileUpload(
        file,
        `project-${projectId}-task-${Date.now()}`,
        "documents"
      );
    } else {
      taskData.attachment = "";
    }

    for (const field of fields) {
      taskData[field] = formData.get(field);
    }

    taskData.members = formData.getAll("members");

    await taskModel.create(taskData);
    revalidatePath(`/projects/${projectId}/tasks`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTask = async (taskId, formData) => {
  try {
    const fields = [
      "title",
      "description",
      "dueDate",
      "project",
      "status",
      "members",
      "priority",
      "report",
      "tag",
    ];

    const updateData = {};

    const file = formData.get("attachment");
    const projectId = formData.get("project");

    if (!projectId) {
      throw new Error("Project ID is required");
    }

    if (file && typeof file === "object" && "arrayBuffer" in file) {
      updateData.attachment = await fileUpload(
        file,
        `project-${projectId}-task-${Date.now()}`,
        "documents"
      );
    }

    for (const field of fields) {
      const value = formData.get(field);
      if (value !== null) updateData[field] = value;
    }

    updateData.members = formData.getAll("members");

    await taskModel.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });

    revalidatePath(`/projects/${updateData.project}/tasks`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTask = async (taskId, projectId) => {
  try {
    await taskModel.findByIdAndDelete(taskId);
    revalidatePath(`/projects/${projectId}/tasks`);
  } catch (error) {
    throw new Error(error.message);
  }
};
