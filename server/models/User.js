import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 10,
    },
    role: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
