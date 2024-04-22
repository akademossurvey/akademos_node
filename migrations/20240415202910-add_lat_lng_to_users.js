'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'address_lat', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
    await queryInterface.addColumn('users', 'address_lng', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'address_lat');
    await queryInterface.removeColumn('users', 'address_lng');
  }
};
