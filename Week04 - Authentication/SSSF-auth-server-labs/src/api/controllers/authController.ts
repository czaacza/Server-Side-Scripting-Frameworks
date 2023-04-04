// TODO: Create login controller that creates a jwt token and returns it to the user
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import {User} from '../../interfaces/User';
import bcrypt from 'bcryptjs';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';

const salt = bcrypt.genSaltSync(10);

const login = async (
  req: Request<{}, {}, {username: string; password: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {username, password} = req.body;

    const user = await userModel.findOne({email: username});
    if (!user) {
      throw new CustomError('Incorrect username', 404);
    }
    const passwordHashed = bcrypt.hashSync(password, salt);

    console.log(user.password);
    if (bcrypt.compareSync(passwordHashed, user.password)) {
      throw new CustomError('Incorrect password', 404);
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string);

    const message: LoginMessageResponse = {
      message: 'Login successful',
      token: token,
    };

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export {login};
