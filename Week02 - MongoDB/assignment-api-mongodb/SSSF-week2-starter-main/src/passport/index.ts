import passport from 'passport';
import {Strategy} from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import bcrypt from 'bcryptjs';
import userModel from '../../src/api/models/userModel';
import {LoginUser} from '../interfaces/User';

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await userModel.findOne({email: username});
      if (user === null || !user) {
        return done(null, false);
      }

      if (!bcrypt.compareSync(password, user.password!)) {
        return done(null, false);
      }
      // convert user to plain object to get rid of binary row type
      const loginUser: LoginUser = user.toObject();
      return done(null, loginUser, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
      return done(err);
    }
  })
);

// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'asdf',
    },
    (jwtPayload, done) => {
      done(null, jwtPayload);
    }
  )
);

export default passport;
