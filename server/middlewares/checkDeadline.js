import Deadline from "../models/Deadline.js";

export const checkDeadline = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const activeDeadline = await Deadline.find({
      type: "teacherSubmitTopics",
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      isActive: true,
    });

    if (!activeDeadline) {
      return res.status(404).json({ message: "The deadline has passed or not started yet." });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
