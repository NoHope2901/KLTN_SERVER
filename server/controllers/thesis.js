import Thesis from "../models/Thesis.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
// create
export const createThesis = async (req, res) => {
  try {
    const { thesisName, studentQuantity, require } = req.body;
    const { code, firstName, lastName } = req.user;

    const newThesis = new Thesis({
      thesisName,
      instructorCode: req.user.code,
      instructorName: `${req.user.firstName} ${req.user.lastName}`,
      instructorPhone: req.user.phoneNumber,
      studentQuantity,
      require,
    });

    const savedThesis = await newThesis.save();

    const users = await User.find();

    users.forEach(async (user) => {
      const newNotification = new Notification({
        userId: user._id,
        message: `${code}-${firstName} ${lastName} vừa thêm một đề tài mới.`,
      });
      await newNotification.save();
    });

    res.status(201).json({ msg: "created successfully", thesisId: savedThesis._id });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// read
export const getAllTheses = async (req, res) => {
  try {
    const theses = await Thesis.find();
    res.status(200).json(theses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getThesisById = async (req, res) => {
  try {
    const { id } = req.params;

    const thesis = await Thesis.findById(id);

    if (!thesis) {
      return res.status(404).json({ message: "Thesis not found" });
    }

    res.status(200).json(thesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRegisteredThesisId = async (req, res) => {
  try {
    const memberId = req.user.code;

    // Chờ dữ liệu từ cơ sở dữ liệu
    const theses = await Thesis.find();

    // Kiểm tra từng luận văn để tìm luận văn mà sinh viên đã đăng ký
    for (const thesis of theses) {
      if (thesis.members.includes(memberId)) {
        return res.status(200).json({ registeredThesisId: thesis._id });
      }
    }

    // Nếu không tìm thấy luận văn nào đã đăng ký
    res.status(200).json({ registeredThesisId: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update
export const teacherUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { thesisName, studentQuantity, require } = req.body;
    const { code, firstName, lastName } = req.user;

    const updatedThesis = await Thesis.findByIdAndUpdate(
      id,
      { thesisName, studentQuantity, require },
      { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và chạy các bộ kiểm tra
    );

    if (!updatedThesis) {
      return res.status(404).json({ message: "Thesis not found" });
    }
    const users = await User.find();

    users.forEach(async (user) => {
      const newNotification = new Notification({
        userId: user._id,
        message: `${code}-${firstName} ${lastName} vừa chỉnh sửa một đề tài.`,
      });
      await newNotification.save();
    });

    res.status(200).json(updatedThesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const memberId = req.user.code;

    const thesis = await Thesis.findById(id);
    if (!thesis) {
      return res.status(404).json({ message: "Thesis not found" });
    }

    if (thesis.members.includes(memberId)) {
      thesis.members = thesis.members.filter((id) => id != memberId);
    } else {
      thesis.members.push(memberId);
    }

    const updatedThesis = await thesis.save();
    res.status(200).json(updatedThesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete
export const deleteThesis = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, firstName, lastName } = req.user;

    const deletedThesis = await Thesis.findByIdAndDelete(id);

    if (!deletedThesis) {
      return res.status(404).json({ message: "Thesis not found" });
    }

    const users = await User.find();

    users.forEach(async (user) => {
      const newNotification = new Notification({
        userId: user._id,
        message: `${code}-${firstName} ${lastName} vừa xóa một đề tài.`,
      });
      await newNotification.save();
    });

    res.status(200).json({ message: "Thesis deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
