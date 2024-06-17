import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentCode: {
      type: String,
      unique: true,
      required: true,
      min: 5,
      max: 7,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    DOB: String,
    class: String,
    major: String,
    phoneNumber: String,
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;
