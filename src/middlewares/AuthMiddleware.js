import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfiguration from '../configurations/AuthConfiguration';

export default {
  async validateToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new Error('Token not provided!');

      const [, token] = authHeader.split(' ');

      if (!token) throw new Error('Token not provided!');

      try {
        const result = await promisify(jwt.verify)(
          token,
          authConfiguration.secret
        );
        const { id } = result;
        req.user_id = id;
      } catch (error) {
        throw new Error('Invalid token!');
      }

      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: error.message ? error.message : error });
    }
  },
};
