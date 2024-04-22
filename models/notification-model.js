const { Sequelize, DataTypes } = require('sequelize');
const postgressDbConnection = require("../utils/connection")
const sequelize = postgressDbConnection
// Define your model
const Notification = sequelize.define('notifications', {
  _id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },

  body: {
    type: DataTypes.STRING
  },
 
  isViewed: {
    type: DataTypes.BOOLEAN
  },
 
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  userId:{
    type:DataTypes.INTEGER
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, { freezeTableName: false, timestamps: true });

// Sync the model with the database
// sequelize.sync();

// Export the model
module.exports = Notification;