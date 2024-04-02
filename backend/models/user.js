import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true, // Assuming most users are not admins by default
    },
    profileImage: {
      type: String, // Store the image URL
      default: "", // Default to an empty string
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
