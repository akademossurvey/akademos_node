const { Sequelize, DataTypes } = require('sequelize');
const postgressDbConnection = require("../utils/connection")
const sequelize = postgressDbConnection
// Define your model
const Library = sequelize.define('libraries', {
  _id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  projectName: {
    type: DataTypes.STRING
  },

  desc: {
    type: DataTypes.STRING
  },
  sector: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  points: {
    type: DataTypes.INTEGER
  },
  subQuestion: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    defaultValue: []
  },
  question: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    defaultValue: []
  },
  filter: {
    type: DataTypes.JSON
  },
  status: {
    type: DataTypes.STRING
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
module.exports = Library;