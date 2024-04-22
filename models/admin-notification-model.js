const { Sequelize, DataTypes } = require('sequelize');
const postgressDbConnection = require("../utils/connection")
const sequelize = postgressDbConnection

// Define your model
const AdminNotification = sequelize.define('adminnotifications', {
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
  user: {
    type: DataTypes.STRING
  },
  image: {type:DataTypes.STRING},
  filter: {type: DataTypes.JSON},
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
module.exports = AdminNotification;