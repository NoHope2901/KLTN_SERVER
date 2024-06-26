import Deadline from "../models/Deadline.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { scheduleNotification } from "../scheduler/sendNotificationAtDeadline.js";

export const createDeadline = async (req, res) => {
  try {
    const { type, description, startDate, endDate } = req.body;

    const newDeadline = new Deadline({
      type,
      description,
      startDate,
      endDate,
    });

    await newDeadline.save();

    // Create notification for teacher when deadline is created
    if (type === "teacherSubmitTopics") {
      const teachers = await User.find({ role: "teacher" });

      teachers.forEach(async (teacher) => {
        const newNotification = new Notification({
          userId: teacher._id,
          message: `A new deadline has been set: ${description}.`,
        });
        await newNotification.save();
      });
    }

    // Schedule notification for students when deadline ends
    if (type === "teacherSubmitTopics") {
      scheduleNotification(newDeadline, "students");
    }

    res.status(201).json(newDeadline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDeadline = async (req, res) => {
  try {
    const deadlines = await Deadline.find();
    res.status(200).json(deadlines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDeadline = async (req, res) => {
  try {
    const { id } = req.params;
    const deadline = await Deadline.findByIdAndDelete(id);

    if (!deadline) {
      return res.status(404).json({ message: "Deadline not found" });
    }

    res.status(200).json({ message: "Deadline deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
