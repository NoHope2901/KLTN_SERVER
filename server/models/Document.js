import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    studentCode: String,
    linkDrive: String,
    linkGithub: String,
  },
  { timestamps: true }
);

const Document = new mongoose.model("Document", documentSchema);
export default Document;
