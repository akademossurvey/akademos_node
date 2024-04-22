'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('settings', 'pp', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('settings', 'tnc', {
      type: Sequelize.TEXT,
      allowNull: true,
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
