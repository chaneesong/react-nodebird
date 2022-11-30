import express from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/index.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
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

export default router;
