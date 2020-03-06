import * as YUP from 'yup';
import User from '../app/models/User';

export default {
  async validateStoreUserModel(req, res, next) {
    try {
      const schema = YUP.object().shape({
        name: YUP.string().required('Name not provided!'),
        email: YUP.string().required('Email not provided!'),
        password: YUP.string().required('Password not provided!'),
      });

      await schema.validate(req.body);
      const { name, email, password, provider } = req.body;

      req.user = {
        name,
        email,
        password,
        provider,
      };

      return next();
    } catch (error) {
      return res.status(401).json({
        error: error.message ? error.message : error,
      });
    }
  },

  async validateUpdateUserModel(req, res, next) {
    try {
      const schema = YUP.object().shape({
        name: YUP.string().required('Name not provided!'),
        email: YUP.string().required('Email not provided!'),
        password: YUP.string().required('Password not provided!'),
        oldPassword: YUP.string().required('Current password not provided!'),
        rePassword: YUP.string().required(
          'Password confirmation not provided!'
        ),
      });

      await schema.validate(req.body);

      const { name, email, password } = req.body;

      req.user.name = name;
      req.user.email = email;
      req.user.password = password;

      return next();
    } catch (error) {
      return res.status(401).json({ error: error.message || error });
    }
  },

  async checkIfUserExists(req, res, next) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) throw new Error('User not found!');
      req.user = user;

      return next();
    } catch (error) {
      return res.status(401).json({ error: error.message || error });
    }
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
