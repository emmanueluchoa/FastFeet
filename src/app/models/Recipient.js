import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        address_number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        cep: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async recipient => {
      if (recipient.complement === undefined || recipient.complement === '')
        recipient.complement = null;
    });
    return this;
  }
}

export default Recipient;
