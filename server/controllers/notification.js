import Notification from "../models/Notification.js";

export const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
