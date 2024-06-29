import Deadline from "../models/Deadline.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Thesis from "../models/Thesis.js";

export const getDataByThesis = async (req, res) => {
  try {
    const data = [];
    const theses = await Thesis.find().lean();

    // Tạo promises để xử lý song song
    const promises = theses.map(async (thesis) => {
      const teacherCode = thesis.instructor.slice(0, 6);
      const teacher = await User.findOne({ code: teacherCode }).lean();

      // Kiểm tra nếu teacher tồn tại
      if (!teacher) {
        throw new Error(`Teacher with code ${teacherCode} not found`);
      }

      // Xử lý song song cho các members
      const studentPromises = thesis.members.map(async (memberCode) => {
        const student = await User.findOne({ code: memberCode }).lean();

        if (!student) {
          throw new Error(`Student with code ${memberCode} not found`);
        }

        return {
          gvhd: thesis.instructor.slice(9),
          mgv: teacher.code,
          sdtgv: teacher.phoneNumber,
          tdt: thesis.thesisName,
          sl: thesis.studentQuantity,
          yc: thesis.require,
          msv: student.code,
          hd: student.firstName,
          t: student.lastName,
          ns: student.dob,
          lcn: student.classCode,
          sdt: student.phoneNumber,
        };
      });

      const studentData = await Promise.all(studentPromises);
      data.push(...studentData);
    });

    await Promise.all(promises);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
