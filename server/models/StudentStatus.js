import mongoose from "mongoose";

const studentStatusSchema = new mongoose.Schema(
  {
    studentCode: {
      type: String,
    },
    president: {
      type: String,
      default: "Không",
    },
    counterArgument: {
      type: String,
      default: "Không",
    },
    date: {
      type: String,
      default: "Không",
    },
    score: {
      type: String,
      default: "0",
    },
    extend: {
      type: String,
      default: "Không",
    },
    protectStatus: {
      type: String,
      default: "Chưa bảo vệ",
    },
  },
  { timestamps: true }
);

const StudentStatus = new mongoose.model("studentStatus", studentStatusSchema);
export default StudentStatus;
