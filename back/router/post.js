import express from 'express';

import { Post, Comment, Image, User } from '../models/index.js';
import { isLoggedIn, findPost } from './middlewares.js';

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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  '/:postId/comment',
  isLoggedIn,
  findPost,
  async (req, res, next) => {
    try {
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
  }
);

router.patch('/:postId/like', isLoggedIn, findPost, async (req, res, next) => {
  try {
    const post = res.locals.post;
    await req.post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch(
  '/:postId/unlike',
  isLoggedIn,
  findPost,
  async (req, res, next) => {
    try {
      const post = res.locals.post;
      await req.post.removeLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
