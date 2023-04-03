import jwt from 'jsonwebtoken';
// Description: This file contains the functions for the user routes
// TODO: add function check, to check if the server is alive
// TODO: add function to get all users
// TODO: add function to get a user by id
// TODO: add function to create a user
// TODO: add function to update a user
// TODO: add function to delete a user
// TODO: add function to check if a token is valid

import {NextFunction, Request, Response} from 'express';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import {User, OutputUser} from '../../interfaces/User';
import bcrypt from 'bcryptjs';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

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
  } catch (error) {
    next(error);
  }
};

const userDelete = async (
  req: Request<{id: string}, {}, User>,
  res: Response,
  next: NextFunction
) => {
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
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// const checkToken = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };

export {check, userListGet, userGet, userPost, userPut, userDelete};
