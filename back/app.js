import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { sequelize } from './models/index.js';
import userRouter from './router/user.js';
import postRouter from './router/post.js';
import postsRouter from './router/posts.js';
import passportConfig from './passport/index.js';

dotenv.config();
const app = express();

app.set('port', 3065);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('database connect success');
  })
  .catch((error) => {
    console.error(error);
  });
passportConfig();

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.listen(app.get('port'), () => {
  console.log('listening');
});
