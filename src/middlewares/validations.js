// const userValidation = {
//   validateEmail: async (req, res, next) => {
//     const { email } = req.body;
//     if (!email || !email.includes('@')) {
//       return res.status(400).json({ message: '"email" must be a valid email' });
//     }
//     next(); 
//   },
//   validateName: async (req, res, next) => {
//     const { displayName } = req.body;
//     if (!displayName || !displayName.length < 8) {
//       return res.status(400)
//       .json({ message: '"displayName" length must be at least 8 characters long' });
//     } 
//     next();
//   },
//   validatePassword: (req, res, next) => {
//     const { password } = req.body;
//     if (!password || !password.length < 6) {
//       return res.status(400)
//       .json({ message: '"password" length must be at least 6 characters long' });
//     } 
//     next();
//   },
// };

const joi = require('joi');

const userSchema = joi.object({
  displayName: joi.string().min(8).required().messages({
    'any.required': '400|"displayName" is required',
    'string.min': '400|"displayName" length must be at least 8 characters long', 
  }),
  password: joi.string().min(6).required().messages({
    'any.required': '400|"password" is required',
    'string.min': '400|"password" length must be at least 6 characters long', 
  }),
  email: joi.string().pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)).required().messages({
    'any.required': '400|"name" is required',
    'string.pattern': '400|"email" must be a valid email', 
  }),
});

const userValidation = (user) => {
  const isValid = userSchema.validate(user);
  return isValid;
};

const userMiddleware = (req, res, next) => {
  const user = { ...req.body };
  const { error } = userValidation(user);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
};

 module.exports = userMiddleware;