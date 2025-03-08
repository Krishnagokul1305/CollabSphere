import dbConnect from "./db";
import projectModel from "./models/project.model";
import Task from "./models/task.model";
import todoModel from "./models/todo.model";

export async function getTodos() {
  await dbConnect();
  const todos = await todoModel.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$date_time" },
        },
        todos: {
          $push: {
            _id: { $toString: "$_id" },
            description: "$description",
            status: "$status",
            priority: "$priority",
            date_time: {
              $dateToString: {
                format: "%Y-%m-%dT%H:%M:%S.%LZ",
                date: "$date_time",
              },
            },
            // createdAt: {
            //   $dateToString: {
            //     format: "%Y-%m-%dT%H:%M:%S.%LZ",
            //     date: "$createdAt",
            //   },
            // },
            // updatedAt: {
            //   $dateToString: {
            //     format: "%Y-%m-%dT%H:%M:%S.%LZ",
            //     date: "$updatedAt",
            //   },
            // }, // Convert updatedAt to string
          },
        },
      },
    },
    { $sort: { _id: 1 } }, // Optional: Sort by date
  ]);
  return todos;
}

export const getTasks = async () => {
  try {
    const task = await Task.find()
      .select("-attachments") // Exclude attachments
      .populate({
        path: "members",
        select: "profileImage",
      })
      .populate({
        path: "completedBy",
        select: "profileImage",
      });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  } catch (error) {
    console.error("Error fetching task view card:", error);
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  try {
    const task = await Task.findById(taskId)
      .populate({
        path: "members",
        select: "name email avatar", // Fetch essential user details
      })
      .populate({
        path: "project",
        select: "name description", // Fetch project details
      });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw error;
  }
};

let controller;

export const searchUser = async (searchTerm) => {
  try {
    if (!searchTerm) return [];

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    const { signal } = controller;

    const res = await fetch(`/api/user/search?search=${searchTerm}`, {
      signal,
    });
    const data = await res.json();
    return data.users;
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn("Previous search request aborted");
      return [];
    }
    console.error("Error searching user:", error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const projects = await projectModel.find().lean();
    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
