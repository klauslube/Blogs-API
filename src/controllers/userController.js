const userService = require('../services/user.service');
const { createToken } = require('../helper/createToken');

const userController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;

    await userService.create({ displayName, email, password, image });
    const token = createToken(email);
    // console.log(token);
    return res.status(201).json({ token });
  },
  
  getAll: async (req, res) => {
    const users = await userService.getAll();
    return res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.status(200).json(user);
  },

  delete: async (req, res) => {
    const { user } = req.email;
    console.log(user);
    await userService.delete({ user });
    return res.status(204).end();
  },
};

module.exports = userController;