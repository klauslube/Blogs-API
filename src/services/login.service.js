const { User } = require('../database/models');
const { createToken } = require('../helper/createToken');
const CustomError = require('../middlewares/CustomError');

  const checkLogin = async ({ email, password }) => {
    if (!email || !password) {
      throw new CustomError(400, 'Some required fields are missing');
    }
  
    const user = await User.findOne({ where: { email } });
    
    if (!user || user.password !== password) {
      throw new CustomError(400, 'Invalid fields');
    }

    const token = createToken(email);
    return token;
  };

module.exports = { checkLogin };