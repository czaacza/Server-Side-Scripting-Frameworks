import {Request} from 'express';
import LoginMessageResponse from '../interfaces/LoginMessageResponse';

export default async (req: Request) => {
  // check that user is in auth server
  const response = await fetch(`${process.env.AUTH_URL}/users/token`, {
    headers: {Authorization: req.headers.authorization as string},
  });
  if (!response.ok) {
    return {};
  }
  const message = (await response.json()) as LoginMessageResponse;

  return message || {};
};
