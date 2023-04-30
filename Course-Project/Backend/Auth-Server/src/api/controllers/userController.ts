import { Request, Response, NextFunction } from 'express';
import CustomError from '../../classes/CustomError';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel';
import DBMessageResponse from '../../interfaces/DBMessageResponse';
import { UserOutput } from '../../interfaces/User';

const salt = bcrypt.genSaltSync(10);

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password -isAdmin -__v');
    if (!users) {
      throw new CustomError('Could not find users', 404);
    }

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id).select(
      '-password -isAdmin -__v'
    );

    if (!user) {
      throw new CustomError('Could not find user', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const user = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    details: req.body.details,
  });

  try {
    const savedUser = await user.save();

    if (!savedUser) {
      throw new CustomError('Could not save user', 500);
    }

    const userOutput: UserOutput = {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    };

    const response: DBMessageResponse = {
      message: 'User created',
      user: userOutput,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (
  req: Request,
  res: Response<{}, { user: UserOutput }>,
  next: NextFunction
) => {
  try {
    const userFromToken = res.locals.user;

    const user = req.body;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    const result = await userModel
      .findByIdAndUpdate(userFromToken.id, user, {
        new: true,
      })
      .select('-password -isAdmin -__v');

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    const response: DBMessageResponse = {
      message: 'user updated',
      user: {
        username: result.username,
        email: result.email,
        id: result._id,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userFromToken = res.locals.user;

    const result = await userModel.findByIdAndDelete(userFromToken.id);
    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }
    const response: DBMessageResponse = {
      message: 'user deleted',
      user: {
        username: result.username,
        email: result.email,
        id: result._id,
      },
    };

    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const updateUserAsAdmin = async (
  req: Request,
  res: Response<{}, { user: UserOutput }>,
  next: NextFunction
) => {
  try {
    if (res.locals.user.isAdmin === false) {
      next(new CustomError('You are not authorized to do this', 401));
      return;
    }
    const user = req.body;
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    const result = await userModel
      .findByIdAndUpdate(req.params.id, user, {
        new: true,
      })
      .select('-password -isAdmin -__v');

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    const response: DBMessageResponse = {
      message: 'user updated',
      user: {
        username: result.username,
        email: result.email,
        id: result._id,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const deleteUserAsAdmin = async (
  req: Request,
  res: Response<{}, { user: UserOutput }>,
  next: NextFunction
) => {
  try {
    if (res.locals.user.isAdmin === false) {
      next(new CustomError('You are not authorized to do this', 401));
      return;
    }
    const result = await userModel.findByIdAndDelete(req.params.id);
    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }
    const response: DBMessageResponse = {
      message: 'user deleted',
      user: {
        username: result.username,
        email: result.email,
        id: result._id,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const checkToken = async (
  req: Request,
  res: Response<{}, { user: UserOutput }>,
  next: NextFunction
) => {
  const userFromToken = res.locals.user;

  const message: DBMessageResponse = {
    message: 'Token is valid',
    user: userFromToken,
  };
  res.json(message);
};

export {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  updateUserAsAdmin,
  deleteUserAsAdmin,
  checkToken,
};
