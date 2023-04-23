import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// TODO: Create login controller that creates a jwt token and returns it to the user

import { NextFunction, Request, Response } from 'express';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';
import { User, UserOutput } from '../../interfaces/User';
import Logging from '../../utils/Logging';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

const salt = bcrypt.genSaltSync(10);

const login = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ email: username });
    if (!user) {
      next(new CustomError('Incorrect username/password', 200));
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      next(new CustomError('Incorrect username/password', 200));
      return;
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string
    );

    const userOutput: UserOutput = {
      username: user.username,
      email: user.email,
      id: user._id,
    };

    const message: LoginMessageResponse = {
      message: 'Login successful',
      token,
      user: userOutput,
    };

    res.json(message);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const register = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
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

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string
    );

    const userOutput: UserOutput = {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    };

    const response: LoginMessageResponse = {
      token: token,
      message: 'User created',
      user: userOutput,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export { login, register };
