import mongoose from "mongoose";

const ThesisSchema = new mongoose.Schema(
  {
    thesisName: String,
    studentQuantity: Number,
    require: String,
  },
  { timestamps: true }
);

const Thesis = mongoose.model("Thesis", ThesisSchema);
export default Thesis;
