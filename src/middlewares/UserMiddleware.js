import User from '../app/models/User';

export default {
  async checkIfUserExists(req, res, next) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'User not found!' });
    req.user = user;

    return next();
  },

  async checkIfUserNotExists(req, res, next) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) return res.status(401).json({ error: 'User already exists!' });

    return next();
  },

  async checkIfUserPasswordMatch(req, res, next) {
    try {
      const { password } = req.body;

      if (!req.user) throw new Error('User not found!');

      if (!(await req.user.checkPassword(password)))
        throw new Error('Password doesnt match!');

      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: error.message ? error.message : error });
    }
  },
};
