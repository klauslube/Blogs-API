const { User } = require('../database/models');
const CustomError = require('../middlewares/CustomError');

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });
    // console.log(email);
    // console.log(user.email);
    
    if (user) throw new CustomError(409, 'User already registered');
    
    const response = await User.create({ displayName, email, password, image });
    return response;
  },
  
};

module.exports = userService;