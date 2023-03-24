// TODO: create the following functions:
// - userGet - get user by id
// - userListGet - get all users
// - userPost - create new user. Remember to hash password
// - userPutCurrent - update current user
// - userDeleteCurrent - delete current user
// - checkToken - check if current user token is valid: return data from req.user. No need for database query

import {NextFunction, Request, Response} from 'express';
import CustomError from '../../classes/CustomError';
import {User, UserOutput} from '../../interfaces/User';
import UserModel from '../models/userModel';
import MessageResponse from '../../interfaces/DBMessageResponse';
import {validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(12);

const userListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const users = await UserModel.find();
    if (!users) {
      next(new CustomError('No users found', 404));
    }
    const usersOutput: UserOutput[] = users.map((user) => {
      return {
        _id: user._id,
        user_name: user.user_name,
        email: user.email,
      };
    });
    res.status(200).json(usersOutput);
  } catch (error) {
    next(error);
  }
};

const userGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      next(new CustomError('User not found', 404));
    }
    const userOutput: UserOutput = {
      _id: (user as User)._id,
      user_name: (user as User).user_name,
      email: (user as User).email,
    };

    res.status(200).json(userOutput);
  } catch (error) {
    next(error);
  }
};

const userPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }
    const userToSend = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, salt),
    };

    const user = await UserModel.create(userToSend);
    if (!user) {
      next(new CustomError('User not created', 404));
    }
    const userOutput: UserOutput = {
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
    };

    const messageResponse: MessageResponse = {
      message: 'User created',
      data: userOutput,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const userPutCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const currentUser = req.user as User;
    console.log('currentUser', currentUser);

    const user = await UserModel.findByIdAndUpdate(currentUser._id, req.body, {
      new: true,
    });
    if (!user) {
      throw new CustomError('User not updated', 404);
    }
    const userOutput: UserOutput = {
      _id: (user as User)._id,
      user_name: (user as User).user_name,
      email: (user as User).email,
    };

    const messageResponse: MessageResponse = {
      message: 'User updated',
      data: userOutput,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const userDeleteCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const currentUser = req.user as User;

    const user = await UserModel.findByIdAndDelete(currentUser._id);
    if (!user) {
      next(new CustomError('User not found', 404));
    }

    const userOutput: UserOutput = {
      _id: (user as User)._id,
      user_name: (user as User).user_name,
      email: (user as User).email,
    };

    const messageResponse: MessageResponse = {
      message: 'User deleted',
      data: userOutput,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const user = req.user as User;
    const userOutput: UserOutput = {
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
    };

    res.status(200).json(userOutput);
  } else {
    next(new CustomError('Token not valid', 400));
  }
};

export {
  userGet,
  userListGet,
  userPost,
  userPutCurrent,
  userDeleteCurrent,
  checkToken,
};
