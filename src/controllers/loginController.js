const loginService = require('../services/login.service');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await loginService.checkLogin({ email, password });
  return res.status(200).json({ token });
};

module.exports = { loginController }; 