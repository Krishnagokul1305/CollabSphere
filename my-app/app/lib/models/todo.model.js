import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "high"],
      default: "low",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User is required"],
    },
    date_time: {
      type: Date,
      required: [true, "Date and Time is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.todos || mongoose.model("todos", todoSchema);
