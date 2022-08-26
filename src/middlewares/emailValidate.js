const userValidation = {
  validateEmail: async (req, res, next) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    next(); 
  },
  validateName: async (req, res, next) => {
    const { displayName } = req.body;
    if (!displayName || !displayName.length < 8) {
      return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
    } 
    next();
  },
  validatePassword: (req, res, next) => {
    const { password } = req.body;
    if (!password || !password.length < 6) {
      return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
    } 
    next();
  },
};
 module.exports = userValidation;