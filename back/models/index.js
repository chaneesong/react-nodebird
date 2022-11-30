'use strict';

import Sequelize from 'sequelize';

import config from '../config/config.js';
import User from './user';
import Post from './post';
import Comment from './comment';
import Image from './image';
import Hashtag from './hashtag';

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
db.Post = Post;
db.Comment = Comment;
db.Image = Image;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Image.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Image.associate(db);
Hashtag.associate(db);

export { sequelize, User, Post, Comment, Image, Hashtag };
export default db;
