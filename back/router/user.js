import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import { User, Post } from '../models/index.js';
import { isLoggedIn, isNotLoggedIn } from './middlewares.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (!req.user) return res.status(200).json(null);
    const fullUserWithoutPassword = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: {
            include: ['id'],
          },
        },
        {
          model: User,
          as: 'Followings',
          attributes: {
            include: ['id'],
          },
        },
        {
          model: User,
          as: 'Followers',
          attributes: {
            include: ['id'],
          },
        },
      ],
    });
    return res.status(200).json(fullUserWithoutPassword);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('already existed email');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('registration success');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: {
              include: ['id'],
            },
          },
          {
            model: User,
            as: 'Followings',
            attributes: {
              include: ['id'],
            },
          },
          {
            model: User,
            as: 'Followers',
            attributes: {
              include: ['id'],
            },
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout((err) => {
    req.session.destroy();
    if (err) {
      console.error(err);
      return next(err);
    }
    res.status(200).send('ok');
  });
});

export default router;
