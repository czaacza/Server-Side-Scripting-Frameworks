import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserIdWithToken } from '../interfaces/User';

export default async (req: Request) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return {
      id: '',
      token: '',
      isAdmin: false,
    };
  }

  const token = bearer.split(' ')[1];

  if (!token) {
    return {
      id: '',
      token: '',
      isAdmin: false,
    };
  }

  const userFromToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as UserIdWithToken;

  if (!userFromToken) {
    return {
      id: '',
      token: '',
      isAdmin: false,
    };
  }

  userFromToken.token = token;

  return userFromToken;
};
