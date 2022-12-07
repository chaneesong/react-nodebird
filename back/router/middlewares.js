import { User, Post } from '../models/index.js';

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
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });

    if (!post) return req.status(403).send('Non-existent post');
    res.locals.post = post;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const findUser = async (req, res, next) => {
  try {
    const id = req.params.userId ? req.params.userId : req.user.id;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    console.log(user);
    if (!user) return req.status(403).send('Non-existent user');
    res.locals.user = user;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { isLoggedIn, isNotLoggedIn, findPost, findUser };
