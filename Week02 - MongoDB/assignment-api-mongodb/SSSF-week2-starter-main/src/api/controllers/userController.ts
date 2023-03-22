// TODO: create the following functions:
// - userGet - get user by id
// - userListGet - get all users
// - userPost - create new user. Remember to hash password
// - userPutCurrent - update current user
// - userDeleteCurrent - delete current user
// - checkToken - check if current user token is valid: return data from req.user. No need for database query

import {NextFunction, Request, Response} from 'express';
import CustomError from '../../classes/CustomError';
import {User} from '../../interfaces/User';
import UserModel from '../models/userModel';
import MessageResponse from '../../interfaces/DBMessageResponse';
import {validationResult} from 'express-validator';

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
    res.status(200).json(users);
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
    res.status(200).json(user);
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

    const user = await UserModel.create(req.body);
    if (!user) {
      next(new CustomError('User not created', 404));
    }
    const messageResponse: MessageResponse = {
      message: 'User created',
      data: user,
    };
    res.status(201).json(messageResponse);
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
    console.log('current user: ', req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const currentUser = req.user as User;

    const user = await UserModel.findByIdAndUpdate(currentUser.id);
    if (!user) {
      next(new CustomError('User not updated', 404));
    }
    const messageResponse: MessageResponse = {
      message: 'User updated',
      data: {
        _id: user!._id,
        user_name: user!.user_name,
        email: user!.email,
      },
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

    const user = await UserModel.findByIdAndDelete(currentUser.id);
    if (!user) {
      next(new CustomError('User not deleted', 404));
    }

    const messageResponse: MessageResponse = {
      message: 'User deleted',
      data: {
        _id: user!._id,
        user_name: user!.user_name,
        email: user!.email,
      },
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }
  } catch (error) {
    next(error);
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
