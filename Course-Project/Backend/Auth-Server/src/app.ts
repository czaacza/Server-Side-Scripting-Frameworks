import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import Logging from './utils/Logging';

import { notFound, errorHandler, checkNotAuthenticated } from './middlewares';
import api from './api';

import flash from 'express-flash';
import session from 'express-session';

import passport from './authentication/passport-config';

const app = express();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

export default app;
