const { Sequelize, DataTypes } = require('sequelize');
const postgressDbConnection = require("../utils/connection")
const sequelize = postgressDbConnection
// Define your model
const Rewards = sequelize.define('rewards', {
  _id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  rewardPoints: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  
  status: {
    type: DataTypes.STRING
  },

}, { freezeTableName: false, timestamps: true });

// Sync the model with the database
// sequelize.sync();

// Export the model
module.exports = Rewards;