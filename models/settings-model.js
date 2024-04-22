const { Sequelize, DataTypes } = require('sequelize');
const postgressDbConnection = require("../utils/connection")
const sequelize = postgressDbConnection
// Define your model
const Settings = sequelize.define('settings', {
  _id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  pp: {
    type: DataTypes.STRING,
    allowNull: true,

  },

  tnc:{
    type:DataTypes.STRING,
    allowNull: true,

  },

  order: {
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

// Sync the model with the database
// sequelize.sync();

// Export the model
module.exports = Settings;