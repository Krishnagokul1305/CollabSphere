import { getServerSession } from "next-auth";
import dbConnect from "./db";
import projectModel from "./models/project.model";
import todoModel from "./models/todo.model";
import "./models/user.model";
import userModel from "./models/user.model";
import { authOptions } from "./auth";
import taskModel from "./models/task.model";
import mongoose, { Mongoose } from "mongoose";
import messageModel from "./models/message.model";

export async function getTodos() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const todos = await todoModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(session.user.id),
      },
    },
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
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return todos;
}

export const getTasks = async () => {
  try {
    await dbConnect();
    const task = await taskModel
      .find()
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

export const getProjects = async (
  page = 0,
  limit = 6,
  search = "",
  status = ""
) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }

    const skip = (page - 1) * limit;
    const userId = session.user.id;

    const baseCondition = {
      $or: [
        { owner: userId },
        {
          members: {
            $elemMatch: {
              user: userId,
              status: { $nin: ["pending", "rejected"] },
            },
          },
        },
      ],
    };

    const filterConditions = [];

    if (search) {
      filterConditions.push({
        name: { $regex: search, $options: "i" },
      });
    }

    if (status && status !== "all") {
      filterConditions.push({
        status,
      });
    }

    const finalQuery =
      filterConditions.length > 0
        ? {
            $and: [baseCondition, ...filterConditions],
          }
        : baseCondition;

    const projects = await projectModel
      .find(finalQuery)
      .skip(skip)
      .limit(limit)
      .select("-members")
      .lean();

    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      isOwnerofProject: project.owner.toString() === userId,
      owner: project.owner.toString(),
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }));
  } catch (error) {
    throw error;
  }
};

export const getProjectcount = async () => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    const userId = session.user.id;

    const totalCount = await projectModel.countDocuments({
      $or: [{ owner: userId }, { "members.user": userId }],
    });

    return totalCount;
  } catch (error) {
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    await dbConnect();
    const project = await projectModel
      .findById(projectId)
      .populate({
        path: "owner",
        select: "name email avatar",
      })
      .lean();
    if (!project) return null;
    return {
      ...project,
      _id: project._id?.toString() || null,
      createdAt: project.createdAt?.toISOString() || null,
      updatedAt: project.updatedAt?.toISOString() || null,
      owner: project?.owner
        ? { ...project.owner, _id: project.owner._id.toString() }
        : null,
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
    const user = await userModel.findOne({ email }).select("-_id").lean();
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
    await dbConnect();
    const task = await taskModel
      .findById(taskId)
      .populate("members", "name email")
      .lean();
    return task;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProjectStats = async () => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    const userId = new mongoose.Types.ObjectId(session.user.id);

    const stats = await projectModel.aggregate([
      {
        $match: {
          $or: [{ owner: userId }, { "members.user": userId }],
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      active: 0,
      inactive: 0,
      completed: 0,
    };

    stats.forEach((item) => {
      result[item._id] = item.count;
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export const getUserTaskStats = async () => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const stats = await taskModel.aggregate([
      {
        $match: {
          members: userId,
        },
      },
      {
        $facet: {
          total: [{ $count: "count" }],
          completed: [
            {
              $match: {
                completedMembers: userId,
              },
            },
            { $count: "count" },
          ],
          highPriority: [
            {
              $match: {
                priority: "High",
                completedMembers: { $ne: userId },
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          total: { $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0] },
          completed: {
            $ifNull: [{ $arrayElemAt: ["$completed.count", 0] }, 0],
          },
          highPriority: {
            $ifNull: [{ $arrayElemAt: ["$highPriority.count", 0] }, 0],
          },
        },
      },
      {
        $addFields: {
          notCompleted: { $subtract: ["$total", "$completed"] },
        },
      },
    ]);

    return (
      stats[0] || {
        total: 0,
        completed: 0,
        notCompleted: 0,
        highPriority: 0,
      }
    );
  } catch (error) {
    console.error("Error in getUserTaskStats:", error);
    throw error;
  }
};

export const getTodayCompletedTasks = async (userId) => {
  try {
    await dbConnect();
    if (!userId) throw new Error("Unauthorized");

    userId = new mongoose.Types.ObjectId(userId);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const completedToday = await taskModel.aggregate([
      {
        $match: {
          completedMembers: userId,
          updatedAt: {
            $gte: startOfToday,
            $lte: endOfToday,
          },
        },
      },
      {
        $count: "tasksCompletedToday",
      },
    ]);

    return completedToday[0]?.tasksCompletedToday || 0;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUpcomingTodos = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = new mongoose.Types.ObjectId(session.user.id);

  const now = new Date();

  const todos = await todoModel
    .find({
      status: "pending",
      date_time: { $gte: now },
      user: userId,
    })
    .sort([
      ["priority", 1],
      ["date_time", 1],
    ])
    .limit(6)
    .select("-user")
    .lean();

  return todos.map((todo) => ({ ...todo, _id: todo._id.toString() }));
};

export const getTaskStatsPerDay = async (userId) => {
  await dbConnect();
  userId = new mongoose.Types.ObjectId(userId);
  const stats = await taskModel.aggregate([
    {
      $match: {
        $or: [{ members: userId }, { completedMembers: userId }],
      },
    },
    {
      $project: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        isAssigned: {
          $in: [userId, "$members"],
        },
        isCompleted: {
          $in: [userId, "$completedMembers"],
        },
      },
    },
    {
      $group: {
        _id: "$date",
        assignedCount: {
          $sum: {
            $cond: [{ $eq: ["$isAssigned", true] }, 1, 0],
          },
        },
        completedCount: {
          $sum: {
            $cond: [{ $eq: ["$isCompleted", true] }, 1, 0],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return stats;
};

export const getAllProjectsWithDetails = async (search = "") => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    const baseCondition = {
      $or: [
        { owner: userId },
        {
          members: {
            $elemMatch: {
              user: userId,
              status: { $nin: ["pending", "rejected"] },
            },
          },
        },
      ],
    };

    const filterConditions = [];

    if (search) {
      filterConditions.push({
        name: { $regex: search, $options: "i" },
      });
    }

    const finalQuery =
      filterConditions.length > 0
        ? { $and: [baseCondition, ...filterConditions] }
        : baseCondition;

    const projects = await projectModel
      .find(finalQuery)
      .select("name owner createdAt updatedAt members")
      .lean();

    const projectsWithDetails = await Promise.all(
      projects.map(async (project) => {
        const latestMessage = await messageModel
          .findOne({ project: project._id })
          .sort({ createdAt: -1 })
          .populate({
            path: "sender",
            select: "name -_id",
          })
          .lean();

        return {
          ...project,
          _id: project._id.toString(),
          isOwnerofProject: project.owner.toString() === userId,
          owner: project.owner.toString(),
          createdAt: project.createdAt.toISOString(),
          updatedAt: project.updatedAt.toISOString(),
          latestMessage: latestMessage
            ? {
                text: latestMessage.content,
                createdAt: latestMessage.createdAt.toISOString(),
                sender: latestMessage.sender,
              }
            : null,
          membersCount: project.members.length,
        };
      })
    );

    return projectsWithDetails;
  } catch (error) {
    throw error;
  }
};

export async function getMessagesByProjectId(projectId) {
  try {
    await dbConnect();
    const messages = await messageModel
      .find({ project: new mongoose.Types.ObjectId(projectId) })
      .sort({ createdAt: 1 })
      .populate({
        path: "sender",
        select: "name email avatar",
      })
      .lean();

    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    const userId = session.user.id;

    return messages.map((msg) => ({
      id: msg._id.toString(),
      sender: { ...msg.sender, _id: msg.sender?._id?.toString() },
      text: msg.content,
      isMe: msg.sender._id.toString() === userId,
      createdAt: msg.createdAt.toISOString(),
      time: msg.createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  } catch (error) {
    throw error;
  }
}
