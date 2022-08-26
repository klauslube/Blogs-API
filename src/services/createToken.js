require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

  const createToken = async (email) => {
    const jwtConfig = {
      expiresIn: '10h',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ user: email }, JWT_KEY, jwtConfig);
    
    return token;
  };

module.exports = createToken;