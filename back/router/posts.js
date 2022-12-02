import express from 'express';

import { Post, User, Comment, Image } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['id', 'nickname'],
          },
        },
      ],
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;