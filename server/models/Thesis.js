import mongoose from "mongoose";

const ThesisSchema = new mongoose.Schema(
  {
    thesisName: String,
    instructor: String,
    studentQuantity: String,
    require: String,
    members: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Thesis = mongoose.model("Thesis", ThesisSchema);
export default Thesis;
