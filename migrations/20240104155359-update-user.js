'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'middleName', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('users', 'lastName', {
      type: Sequelize.STRING,
  });
    await queryInterface.renameColumn('users', 'name','firstName', {
      type: Sequelize.STRING,
    });   
     await queryInterface.addColumn('users', 'cnic', {
      type: Sequelize.STRING,
  });
     await queryInterface.addColumn('users', 'city', {
      type: Sequelize.STRING,
  });
     await queryInterface.addColumn('users', 'country', {
      type: Sequelize.STRING,
  });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
