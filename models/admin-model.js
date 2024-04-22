const { Sequelize, DataTypes } = require('sequelize');
const postgressDbConnection = require("../utils/connection")
// Initialize Sequelize instance
const sequelize = postgressDbConnection

// Define your model
const Admin = sequelize.define('admins', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  fcm: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue:[]
  },



  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { freezeTableName: false, timestamps: true });

// Sync the model with the database
// sequelize.sync();

// Export the model
module.exports = Admin;