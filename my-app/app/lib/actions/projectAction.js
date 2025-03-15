"use server";

import { revalidatePath } from "next/cache";
import projectModel from "../models/project.model";
import { sendNotification } from "./notificationAction";

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

export async function inviteMember(projectId, userId, role = "member") {
  const project = await projectModel.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const isUserAlreadyMember = project.members.some(
    (member) => member.user.toString() === userId.toString()
  );

  if (isUserAlreadyMember) {
    throw new Error("User is already a member of the project");
  }

  await projectModel.findByIdAndUpdate(projectId, {
    $push: { members: { user: userId, role, status: "pending" } },
  });

  await sendNotification({
    recipient: userId,
    sender: project.owner,
    project: projectId,
    type: "invite_request",
    message: `You have been invited to join the project: ${project.name}.`,
  });

  revalidatePath(`/projects/${projectId}/members`);
}

export async function acceptInvite(projectId, userId) {
  const project = await projectModel.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  await projectModel.updateOne(
    { _id: projectId, "members.user": userId },
    { $set: { "members.$.status": "active" } }
  );

  await sendNotification({
    recipient: project.owner,
    sender: userId,
    project: projectId,
    type: "invite_accepted",
    message: `User has accepted your project invitation for ${project.name}.`,
  });

  revalidatePath(`/projects/${projectId}/members`);
}

export async function rejectInvite(projectId, userId) {
  const project = await projectModel.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  await projectModel.updateOne(
    { _id: projectId },
    { $pull: { members: { user: userId } } }
  );

  await sendNotification({
    recipient: project.owner,
    sender: userId,
    project: projectId,
    type: "invite_rejected",
    message: `User has rejected your project invitation for ${project.name}.`,
  });

  revalidatePath(`/projects/${projectId}/members`);
}
