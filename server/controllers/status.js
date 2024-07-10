import StudentStatus from "../models/StudentStatus.js";

// get

export const getStudentStatus = async (req, res) => {
  try {
    const data = await StudentStatus.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// update
// const updateStatus
