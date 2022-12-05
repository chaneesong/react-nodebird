import { Post } from '../models/index.js';

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Login required');
  }
  return next();
};

const isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(401).send('Already Logged in');
  }
  return next();
};

const findPost = async (req, res, next) => {
  const post = await Post.findOne({
    where: {
      id: req.params.postId,
    },
  });

  if (!post) return req.status(403).send('Non-existent post');
  res.locals.post = post;
  next();
};

export { isLoggedIn, isNotLoggedIn, findPost };
