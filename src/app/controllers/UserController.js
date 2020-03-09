import bcrypt from 'bcryptjs';
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

      const { newEmail, newName, password } = req.body;

      if (newEmail) req.user.email = newEmail;
      if (newName) req.user.name = newName;
      if (password) req.user.password = password;

      const user = await User.update(
        {
          name: newName || req.user.name,
          email: newEmail || req.user.email,
          password: password || req.user.password,
        },
        { where: { id: req.user.id } }
      );

      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: error.message || error });
    }
  }
}
export default new UserController();
