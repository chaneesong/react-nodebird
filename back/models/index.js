'use strict';

const Sequelize = require('sequelize');

const config = require('../config/config')[env];
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

User.associate(db);

module.exports = db;
