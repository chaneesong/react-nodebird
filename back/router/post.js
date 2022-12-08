import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { Post, Comment, Image, User } from '../models/index.js';
import { isLoggedIn, findPost } from './middlewares.js';

const router = express.Router();
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('create uploads directory');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, res, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      console.log(file.originalname);
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', upload.none(), isLoggedIn, async (req, res, next) => {
  try {
    let requestImage = req.body.image;
    if (requestImage && !Array.isArray(requestImage))
      requestImage = [requestImage];
    const images = await Promise.all(
      requestImage.map((image) => Image.create({ name: image }))
    );
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    await post.addImages(images);

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
  '/images',
  isLoggedIn,
  upload.array('image'),
  async (req, res, next) => {
    try {
      res.json(req.files.map((v) => v.filename));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

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
    await post.addLikers(req.user.id);
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
      await post.removeLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete('/:postId', isLoggedIn, findPost, async (req, res, next) => {
  try {
    console.log(req.params.id, req.user.id);
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    res.json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
