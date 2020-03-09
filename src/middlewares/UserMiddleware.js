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
        name: YUP.string(),
        email: YUP.string(),
        newEmail: YUP.string().test(
          'email',
          'An user with new email provided already exists!',
          async function newEmailCheck(value) {
            let isValid = true;

            if (value) {
              const userExists = await User.findOne({
                where: { email: value },
              });

              if (userExists) isValid = false;
            }

            return isValid;
          }
        ),
        oldPassword: YUP.string(),
        password: YUP.string().test(
          'oldPassword',
          'Old password not provided!',
          function checkOldPasswordProvided(value) {
            const { oldPassword } = this.parent;
            let isValid = true;
            if (value) isValid = value && oldPassword;

            return isValid;
          }
        ),
        rePassword: YUP.string().test(
          're-passwordCheck',
          'Re-password does not match!',
          function checkRePassword(value) {
            const { password } = this.parent;
            let isValid = true;

            if (password) isValid = value === password;

            return isValid;
          }
        ),
      });

      await schema.validate(req.body);

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
      const { password, oldPassword } = req.body;

      if (!req.user) throw new Error('User not found!');

      if (!(await req.user.checkPassword(oldPassword || password)))
        throw new Error('Password does not match!');

      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: error.message ? error.message : error });
    }
  },
};
