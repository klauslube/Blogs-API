module.exports = (req, res, next) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  } 
  next();
};