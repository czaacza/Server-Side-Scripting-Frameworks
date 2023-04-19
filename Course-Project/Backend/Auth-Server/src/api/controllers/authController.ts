import jwt from 'jsonwebtoken';
import { User, UserOutput } from '../../interfaces/User';
import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import bcrypt from 'bcryptjs';
import passport from '../../authentication/passport-config';
import Logging from '../../utils/Logging';

const salt = bcrypt.genSaltSync(10);

const register = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  Logging.info(`body:, ${req.body}`);

  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const user = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();

    if (!savedUser) {
      throw new CustomError('Could not save user', 500);
    }

    const userOutput: UserOutput = {
      username: savedUser.username,
      email: savedUser.email,
    };

    res.status(201).redirect('/');
  } catch (error) {
    next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', function (err: Error, user: User) {
    if (err || !user) {
      return next(err);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log('user', user);

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as string
      );

      const userOutput: UserOutput = {
        username: user.username,
        email: user.email,
      };

      return res.status(200).json({ user: userOutput, token });
    });
  })(req, res, next);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    Logging.info('logged out');
    res.status(200).redirect('/');
  });
};
export { register, login, logout };
