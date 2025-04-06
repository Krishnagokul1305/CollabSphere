"use server";

import { revalidatePath } from "next/cache";
import taskModel from "../models/task.model";

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

export const createTask = async (taskData) => {
  try {
    const data = await taskModel.create(taskData);
  } catch (error) {
    console.error("Task Creation Error:", error);
    throw new Error(error.message);
  }
};

export const updateTask = async (taskId, updateData) => {
  try {
    const data = await taskModel.findByIdAndUpdate(taskId, updateData, {
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
