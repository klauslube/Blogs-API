const { User } = require('../database/models');
const CustomError = require('../middlewares/CustomError');

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });
    
    if (user) throw new CustomError(409, 'User already registered');
    
    const response = await User.create({ displayName, email, password, image });
    return response;
  },

  getAll: async () => {
    const user = await User.findAll({ attributes: { exclude: 'password' } });
    return user;
  },
  
};

module.exports = userService;