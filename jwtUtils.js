const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, 'lmw', { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, 'lmw');
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
