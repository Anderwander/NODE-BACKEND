import User from "../../models/user.js";

//Get user
const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    let data = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
    };
    let user = await User.create(data);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating user.",
    });
  }
};

export default {
  getAll,
  create,
};
