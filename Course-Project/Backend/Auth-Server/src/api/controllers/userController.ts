import { Request, Response, NextFunction } from 'express';
import CustomError from '../../classes/CustomError';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password -isAdmin');
    if (!users) {
      throw new CustomError('Could not find users', 404);
    }

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new CustomError('Could not find user', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(user.password, salt);
    const result = await user.save();

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      throw new CustomError('Could not find user', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new CustomError('Could not find user', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUserById, addUser, updateUser, deleteUser };
