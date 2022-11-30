import express from 'express';
import { User } from '../models/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  await User.create({
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,
  });
  req.json();
});

export default router;
