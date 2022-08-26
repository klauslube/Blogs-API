const { User } = require('../database/models');
const { token } = require('../services/createToken');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await User.findOne({ where: { email } });
  
  if (user.password !== password || user.email !== email) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return res.status(200).json(token);
};

module.exports = loginController;