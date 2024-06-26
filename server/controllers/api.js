import Deadline from "../models/Deadline.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Thesis from "../models/Thesis.js";

export const getDataByThesis = async (req, res) => {
  try {
    const data = [];
    const theses = await Thesis.find();
    for (const thesis of theses) {
      const teacher = await User.find({ code: thesis.instructor.slice(0, 6) });
      for (const member of thesis.members) {
        const student = await User.find({ code: member });
        data.push({
          gvhd: thesis.instructor.slice(9, thesis.instructor.length),
          mgv: teacher.code,
          sdtgv: teacher.phoneNumber,
          tdt: thesis.thesisName,
          sl: thesis.studentQuantity,
          yc: thesis.require,
          msv: student.code,
          hd: student.firstName,
          t: student.lastName,
          lcn: student.classCode,
          sdt: student.phoneNumber,
        });
      }
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
