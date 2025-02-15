const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: Number,
      required: true,
    },
    batch: String,
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty"],
      default: "student",
    },
    Mentor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    img: {
      type: String,
      default:
        "https://imgcdn.stablediffusionweb.com/2024/2/24/88cfa19b-b263-4599-a1c5-bb34eb13eb9c.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
