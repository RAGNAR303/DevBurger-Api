import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization;
console.log(authToken)
  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }
  const token = authToken.split('').at(1);

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error('oi');
      }
      request.userId = decoded.id
      return next();
    });
  } catch (err) {
    return response.status(401).json({ error: 'Token is invalid' });
  }

}
export default authMiddleware;
