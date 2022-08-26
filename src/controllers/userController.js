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
};

module.exports = userController;