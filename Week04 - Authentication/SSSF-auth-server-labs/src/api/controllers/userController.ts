import jwt from 'jsonwebtoken';

import {NextFunction, Request, Response} from 'express';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import {User, OutputUser} from '../../interfaces/User';
import bcrypt from 'bcryptjs';
import DBMessageResponse from '../../interfaces/DBMessageResponse';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';

const salt = bcrypt.genSaltSync(10);

const check = (req: Request, res: Response) => {
  res.json({message: 'Server is alive'});
};

const userListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find();
    if (!users) {
      throw new CustomError('No users found', 404);
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const userGet = async (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select('-password -role');
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const userPost = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;

    user.password = await bcrypt.hash(user.password, salt);

    const gotUser = await userModel.create(user);
    const userOutput: OutputUser = {
      id: gotUser._id,
      user_name: gotUser.user_name,
      email: gotUser.email,
    };
    if (!userOutput) {
      throw new CustomError('User not found', 404);
    }

    const response: DBMessageResponse = {
      message: 'User created',
      user: userOutput,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const userPut = async (
  req: Request<{id: string}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    const result = await userModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });
    if (!result) {
      throw new CustomError('User not found', 404);
    }
    const userOutput: OutputUser = {
      id: result._id,
      user_name: result.user_name,
      email: result.email,
    };

    const response: DBMessageResponse = {
      message: 'User updated',
      user: userOutput,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const userDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers;
    const bearer = headers.authorization;
    if (!bearer) {
      throw new CustomError('No token provided', 401);
    }
    const token = bearer.split(' ')[1];
    if (!token) {
      throw new CustomError('No token provided', 401);
    }

    const userFromToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as OutputUser;

    const result = await userModel.findByIdAndDelete(userFromToken.id);
    if (!result) {
      throw new CustomError('User not found', 404);
    }

    const userOutput: OutputUser = {
      id: result._id,
      user_name: result.user_name,
      email: result.email,
    };

    const response: DBMessageResponse = {
      message: 'User deleted',
      user: userOutput,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers;
    const bearer = headers.authorization;
    if (!bearer) {
      throw new CustomError('No token provided', 401);
    }
    const token = bearer.split(' ')[1];
    if (!token) {
      throw new CustomError('No token provided', 401);
    }

    const userFromToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as OutputUser;

    const result = await userModel
      .findById(userFromToken.id)
      .select('-password -role');

    if (!result) {
      throw new CustomError('User not found', 404);
    }

    const newToken = jwt.sign(
      {
        id: result._id,
      },
      process.env.JWT_SECRET as string
    );

    const response: LoginMessageResponse = {
      message: 'Token is valid',
      token: newToken,
    };

    res.status(200).json({message: 'Token is valid'});
  } catch (error) {
    next(error);
  }
};

export {check, userListGet, userGet, userPost, userPut, userDelete, checkToken};
