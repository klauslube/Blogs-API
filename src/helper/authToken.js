require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('../middlewares/CustomError');

const { JWT_SECRET } = process.env;
const authToken = (req, _res, next) => {
  const token = req.headers.authorization;
  
  if (!token) throw new CustomError(401, 'Token not found');

  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;

  if (!decoded) throw new CustomError(401, 'Expired or invalid token');

  next();
};

module.exports = { authToken };