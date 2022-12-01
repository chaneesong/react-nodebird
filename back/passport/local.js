import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import { User } from '../models/index.js';

const localLoginStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: {
              email: email,
            },
          });
          if (!user) {
            return done(null, false, { reason: 'Non-existent email' });
          }
          const isPassword = await bcrypt.compare(password, user.password);
          if (!isPassword) {
            return done(null, false, { reason: 'Password dont match' });
          }
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

export default localLoginStrategy;
