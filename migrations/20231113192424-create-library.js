'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('libraries', {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectName: {
        type: Sequelize.STRING
      },

      desc: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.INTEGER
      },
      subQuestion: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: []
      },
      question: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: []
      },
      filter: {
        type: Sequelize.JSON
      },
      status: {
        type: Sequelize.STRING
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    /**
     * 
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
