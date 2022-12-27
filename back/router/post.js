import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { Post, Comment, Image, User, Hashtag } from '../models/index.js';
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
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', upload.none(), isLoggedIn, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    let requestImage = req.body.image;
    if (requestImage && !Array.isArray(requestImage))
      requestImage = [requestImage];
    const images = requestImage
      ? await Promise.all(
          requestImage.map((image) => Image.create({ name: image }))
        )
      : null;
    const post = await Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    await post.addImages(images);

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
        )
      );
      await post.addHashtags(result.map((v) => v[0]));
    }

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

router.get('/:postId', findPost, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    const fullPost = await Post.findOne({
      where: { id: req.params.postId },
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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.json(fullPost);
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
      res.json(
        req.files.map((v) => v.location.replace(/\/original\//, '/thumb/'))
      );
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

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) return req.status(403).send('Non-existent post');
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('Do not try to retweet your post');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('This post has already been retweeted');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      where: {
        id: retweet.id,
      },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

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
