import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNo: {
      type: String,
      // unique: true,
      trim: true,
    },
    Bio: {
      type: String,
      trim: true,
    },
    // password: {
    //   type: String,
    //   required: [true, "Password is required"],
    //   minlength: [6, "Password must be at least 6 characters long"],
    // },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // resetToken: { type: String },
    // resetTokenExpiry: { type: Date },
    avatar: {
      type: String,
      default: "default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

export default mongoose.models?.users || mongoose.model("users", userSchema);
