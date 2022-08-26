require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = async (email) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const JWT_KEY = process.env.JWT_SECRET;
  const token = jwt.sign({ user: email }, JWT_KEY, jwtConfig);
  return token;
};

module.exports = { createToken };