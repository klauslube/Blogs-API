require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

const auth = {
  createToken: async (email) => {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ user: email }, JWT_KEY, jwtConfig);
    
    return token;
  },

  // validateToken: async (req, res, next) => {
  //   const { authorization } = req.headers;
    
  //   const validToken = jwt.verify(authorization, JWT_KEY);
    
  //   if (!validToken) res.status(401).json({ message: 'Expired or invalid token' });
  // },

};

module.exports = auth;