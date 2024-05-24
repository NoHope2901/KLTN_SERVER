import bcrypt from "bcrypt";
import User from "../models/User.js";

const createNewUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Băm mật khẩu trước khi lưu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();

    res.status(201).json({ msg: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default createNewUser;
