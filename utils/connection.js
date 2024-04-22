const { Sequelize } = require("sequelize");


const host = 'localhost'
const database = 'akademos'
const dialect = 'postgres'
const user='postgres'
const password = 'admin'
const port = 5432


module.exports =new Sequelize(database, user, password, {
  host: 'localhost',
  dialect: 'postgres'
});






