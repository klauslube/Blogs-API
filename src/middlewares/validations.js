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
  email: joi.string().email().required()
  .messages({
    'any.required': '400|"name" is required',
    'string.email': '400|"email" must be a valid email', 
  }),
  image: joi.string().required().messages({
    'any.required': '400|"image" is required',
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
    return res.status(code).json({ message });
  }
  next();
};

 module.exports = { userMiddleware };