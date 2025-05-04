import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Message content cannot be empty"],
      trim: true,
    },
    recipients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    attachments: [
      {
        fileUrl: String,
        fileName: String,
        fileType: String,
      },
    ],
    deletedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.messages ||
  mongoose.model("messages", messageSchema);
