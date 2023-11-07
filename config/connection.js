// IMPORTS
require('dotenv').config();
const Sequelize = require('sequelize');

// INITIATING ENVIRONMENT
const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host:'127.0.0.1', // change to 'localhost'
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true,
        },
    });

// EXPORT
module.exports = sequelize;
