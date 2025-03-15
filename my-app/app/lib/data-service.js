import dbConnect from "./db";
import projectModel from "./models/project.model";
import Task from "./models/task.model";
import todoModel from "./models/todo.model";
import "./models/user.model";

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
    await dbConnect();
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

export const getProjectById = async (projectId) => {
  try {
    await dbConnect();
    const project = await projectModel.findById(projectId).lean();
    return project;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function getProjectUsers(projectId) {
  try {
    const project = await projectModel
      .findById(projectId)
      .populate({
        path: "owner",
        select: "name email avatar phoneNo ",
      })
      .populate({
        path: "members.user",
        select: "name email avatar phoneNo ",
      })
      .lean();

    if (!project) {
      throw new Error("Project not found");
    }

    return {
      owner: {
        ...project?.owner,
        _id: project?.owner?._id?.toString(),
      },
      members: project.members.map((member) => ({
        ...member,
        _id: member._id.toString(),
        user: {
          ...member.user,
          _id: member.user._id.toString(),
        },
      })),
    };
  } catch (error) {
    console.error("Error fetching project users:", error);
    throw error;
  }
}

export async function hasUnreadNotifications(userId) {
  try {
    await dbConnect();
    const exists = await Notification.exists({
      recipient: userId,
      isRead: false,
    });
    return !!exists;
  } catch (error) {
    console.error("Error checking unread notifications:", error);
    return false;
  }
}

export async function getUserNotifications(userId) {
  try {
    if (!userId) return null;
    const response = await fetch(`/api/notification?userId=${userId}`, {
      next: { tags: ["notifications"] },
    });
    if (!response.ok) throw new Error("Failed to fetch notifications");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}
