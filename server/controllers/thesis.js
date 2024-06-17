import Thesis from "../models/Thesis.js";

// create
export const createThesis = async (req, res) => {
  try {
    const { thesisName, studentQuantity, require } = req.body;

    const newThesis = new Thesis({
      thesisName: thesisName,
      studentQuantity: studentQuantity,
      require: require,
    });

    const savedThesis = await newThesis.save();

    res.status(201).json({ thesisId: savedThesis._id });
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

// update
export const updateThesis = async (req, res) => {
  try {
    const { id } = req.params;
    const { thesisName, studentQuantity, require } = req.body;

    const updatedThesis = await Thesis.findByIdAndUpdate(
      id,
      { thesisName, studentQuantity, require },
      { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và chạy các bộ kiểm tra
    );

    if (!updatedThesis) {
      return res.status(404).json({ message: "Thesis not found" });
    }

    res.status(200).json(updatedThesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete
export const deleteThesis = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedThesis = await Thesis.findByIdAndDelete(id);

    if (!deletedThesis) {
      return res.status(404).json({ message: "Thesis not found" });
    }

    res.status(200).json({ message: "Thesis deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};