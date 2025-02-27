"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "../db";
import todoModel from "../models/todo.model";

export async function createTodo(data) {
  await dbConnect();
  const newTodo = await todoModel.create({
    ...data,
    user: "67b2a9d26417c4c73559f646",
  });
  revalidatePath("/todo");
  return {
    ...newTodo.toObject(),
    _id: newTodo._id.toString(),
    createdAt: newTodo.createdAt.toISOString(),
    updatedAt: newTodo.updatedAt.toISOString(),
  };
}

export async function toggleStatus(id) {
  await dbConnect();
  const todo = await todoModel.findById(id);
  todo.status = todo.status === "completed" ? "pending" : "completed";
  await todo.save();
  revalidatePath("/todo");
}

export async function deleteTodo(id) {
  console.log(id);
  await dbConnect();
  await todoModel.findByIdAndDelete(id);
  revalidatePath("/todo");
}

export async function updateTodo(id, data) {
  await dbConnect();
  const todo = await todoModel.findById(id);
  todo.description = data.description;
  todo.priority = data.priority;
  todo.date_time = data.date_time;
  await todo.save();
  revalidatePath("/todo");
}
