const { Sequelize, DataTypes } = require('sequelize');
const Users = require('./user-model');
const postgressDbConnection = require("../utils/connection")
const sequelize = postgressDbConnection

// Define your model
const Userresponses = sequelize.define('userresponses', {
  _id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  survey: {
    type: DataTypes.JSON
  },

  surveyId:{
    type:DataTypes.INTEGER
  },
  status: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER
  },
 
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, { freezeTableName: false, timestamps: true });

Userresponses.belongsTo(Users);


// Sync the model with the database
// sequelize.sync();

// Export the model
module.exports = Userresponses;