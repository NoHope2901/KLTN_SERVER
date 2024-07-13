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
export const updateCouncil = async (req, res) => {
  try {
    const { studentCode, role, updateName } = req.body;
    // console.log(studentCode, role, updateName);

    const updateStudentStatus = await StudentStatus.findOne({ studentCode: studentCode });

    if (!updateStudentStatus) {
      return res.status(404).json("student status not found");
    }

    updateStudentStatus[role] = updateName;
    await updateStudentStatus.save();

    res.status(200).json("Update successful");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const updateStatus
