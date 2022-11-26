'use strict';

import Sequelize from 'sequelize';

import config from '../config/config';
import User from './user';

const env = process.env.NODE_ENV || 'development';
const db = {};

const sequelizeConfig = config[env];
const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

User.associate(db);

module.exports = db;
