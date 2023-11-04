// imports
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// middleware
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars engine
const hbs = exphbs.create({ helper });

const sess = {
    secret: "Super secret secret",
    cookie: {
        maxAge: 1200000,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    },
    
}