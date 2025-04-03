import { getServerSession } from "next-auth";
import dbConnect from "./db";
import projectModel from "./models/project.model";
// import Task from "./models/task.model";
import todoModel from "./models/todo.model";
import "./models/user.model";
import userModel from "./models/user.model";
import { authOptions } from "./auth";
import taskModel from "./models/task.model";

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
    await dbConnect();
    if (!taskId) throw new Error("Task is not found");
    let task = await taskModel
      .findById(taskId)
      .populate({
        path: "members",
        select: "name email avatar",
      })
      .lean();
    if (!task) throw new Error("Task not found");
    task = {
      ...task,
      _id: task?._id.toString(),
      project: task.project.toString(),
      members: task.members.map((member) => {
        return { ...member, _id: member._id.toString() };
      }),
      completedMembers: task?.completedMembers?.map((member) => {
        return member.toString();
      }),
    };
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
    const projects = await projectModel.find().select("-members").lean();
    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }));
  } catch (error) {
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    await dbConnect();
    const project = await projectModel.findById(projectId).lean();
    if (!project) return null;
    return {
      ...project,
      _id: project._id?.toString() || null,
      createdAt: project.createdAt?.toISOString() || null,
      updatedAt: project.updatedAt?.toISOString() || null,
      owner: project.owner ? project.owner.toString() : null,
      members:
        project.members?.map((member) => ({
          ...member,
          _id: member._id?.toString() || null, // Convert member _id to string
          user: member.user ? member.user.toString() : null,
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};
export async function isOwner(projectId) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return false;
    }

    const project = await projectModel
      .findById(projectId)
      .select("owner")
      .lean();

    if (!project) return false;

    return project.owner.toString() === session?.user?.id;
  } catch (error) {
    console.error("Error checking project ownership:", error);
    return false;
  }
}

export async function getProjectUsers(projectId, onlyAccepted = false) {
  try {
    await dbConnect();
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
      members: project.members
        .filter((member) => !onlyAccepted || member.status === "active")
        .map((member) => ({
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

export async function getUserByEmail(email) {
  try {
    await dbConnect();
    const user = await userModel.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

export const getTasksByProjectId = async (projectId) => {
  try {
    await dbConnect();
    const tasks = await taskModel
      .find({ project: projectId })
      .populate("members", "name email")
      .populate("completedMembers", "avatar -_id")
      .lean();
    if (!tasks) {
      return null;
    }
    return tasks.map((task) => ({
      id: task._id.toString(),
      tag: task.tag || "General",
      title: task.title,
      description: task.description,
      progress: 0,
      members: task?.members?.map(
        (member) => member.avatar || "/default-user.png"
      ),
      completedMembers: task?.completedMembers?.map(
        (member) => member.avatar || "/default-user.png"
      ),
      dueDate: new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "2-digit",
      }),
      priority: task.priority,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTasksById = async (taskId) => {
  try {
    const task = await taskModel
      .findById(taskId)
      .populate("members", "name email")
      .lean();
    return task;
  } catch (error) {
    throw new Error(error.message);
  }
};
