const User = require('../database/models');

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const response = await User.create({ displayName, email, password, image });
    return response;
  },
  
};

module.exports = userService;