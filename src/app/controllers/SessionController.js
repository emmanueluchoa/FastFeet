import jwt from 'jsonwebtoken';
import authConfiguration from '../../configurations/AuthConfiguration';

class SessionController {
  async store(req, res) {
    const { id, name, email } = req.user;

    if (!req.user) throw new Error('User not exists!');

    try {
      return res.status(200).json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfiguration.secret, {
          expiresIn: authConfiguration.expiresIn,
        }),
      });
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
}

export default new SessionController();
