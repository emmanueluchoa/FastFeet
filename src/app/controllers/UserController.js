import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      if (!req.user) throw new Error('User not provided!');

      const user = User.create(req.user);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: error.message || error });
    }
  }

  async update(req, res) {
    try {
      if (!req.user) throw new Error('User not provided!');

      const user = User.update(req.user);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: error.message || error });
    }
  }
}
export default new UserController();
