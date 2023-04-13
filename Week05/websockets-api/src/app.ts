import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { createServer } from 'http';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Server } from 'socket.io';

import * as middlewares from './middlewares';
import MessageResponse from './interfaces/MessageResponse';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './interfaces/ISocket';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const http = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(http, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('update', (message) => {
    console.log(message);
    io.emit('addAnimal', 'Animal added');
  });
});

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎 Index 🌍🌏✨🌈🦄',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default http;
