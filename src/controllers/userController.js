// const { User } = require('../database/models');
const userService = require('../services/userService');

const userController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    


  },
};

module.exports = userController;