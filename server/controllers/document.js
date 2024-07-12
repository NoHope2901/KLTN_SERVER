import Document from "../models/Document.js";

export const createDocument = async (req, res) => {
  try {
    const { code } = req.user;
    const { linkDrive, linkGithub } = req.body;

    const newDocument = new Document({
      studentCode: code,
      linkDrive,
      linkGithub,
    });

    await newDocument.save();

    res.status(201).json({ message: "created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLinkDocument = async (req, res) => {
  try {
  } catch (error) {}
};
