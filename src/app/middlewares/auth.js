import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

function authMiddleware(request, response, next) {
  const authToken = request.headers.authorization;
  console.log(authToken);
  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }
  const [, token] = authToken.split(' ');

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error();
      }
      request.userId = decoded.id;
      request.userName = decoded.name;
      
    });
  } catch (err) {
    return response.status(401).json({ error: 'Token is invalid' });
  }
  return next();
}
export default authMiddleware;
