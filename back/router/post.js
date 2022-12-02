import express from 'express';

import { Post, Comment, Image, User } from '../models/index.js';
import { isLoggedIn } from './middlewares.js';

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    const fullPost = await Post.findOne({
      where: {
        id: post.id,
      },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) return res.status(403).send('Non-existent post');
    const comment = await Comment.create({
      UserId: req.user.id,
      content: req.body.content,
      PostId: req.params.postId,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    return res.json(fullComment);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

export default router;
