import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password)
        user.password_hash = await bcrypt.hash(user.password, 8);
    });

    this.addHook('beforeBulkUpdate', async params => {
      const { password } = params.attributes;
      if (password) {
        params.attributes.password_hash = await bcrypt.hash(password, 8);
        params.fields.push('password_hash');
      }
    });

    return this;
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
