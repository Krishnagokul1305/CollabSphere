import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this project"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this project"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
        status: {
          type: String,
          enum: ["pending", "active", "rejected", "inactive"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.projects || mongoose.model("projects", schema);
