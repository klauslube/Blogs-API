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
  
  getById: async (id) => {
    const user = await User.findOne({ attributes: { exclude: 'password' }, where: { id } });
    console.log(user);
    if (!user) throw new CustomError(404, 'User does not exist');

    return user;
  },

  getUser: async (email) => {
    const userId = await User.findOne({ where: { email } });
    // console.log(userId);
    const { id } = userId;
    return id;
  },

  delete: async ({ user }) => {
    const userId = await userService.getUser(user);
    const id = userId;
    const deleteUser = await User.destroy({ where: { id } });
    return deleteUser;
  },

};

module.exports = userService;