const { Sequelize, DataTypes } = require('sequelize');
const postgressDbConnection = require("../utils/connection")
const sequelize = postgressDbConnection
// Define your model
const Users = sequelize.define('users', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },

  phoneCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },

  cnic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address_lat: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  },
  address_lng: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  },
  fcm: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },



  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { freezeTableName: false, timestamps: true });

// Sync the model with the database
// sequelize.sync();

// Export the model
module.exports = Users;