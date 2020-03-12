const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'admin',
          email: 'uchoa.emmanuel@gmail.com',
          password_hash: bcrypt.hashSync('admin', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Distribuidora FastFeet',
          email: 'admin@fastfeet.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
