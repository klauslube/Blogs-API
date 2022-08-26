require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('../middlewares/CustomError');

const { JWT_SECRET } = process.env;

const authToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) throw new CustomError(401, 'Token not found');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log('teste', decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { authToken };