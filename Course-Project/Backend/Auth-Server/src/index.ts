import mongoose from 'mongoose';
import Logging from './utils/Logging';
import { config } from './config/config';

import app from './app';

mongoose
  .connect(config.mongo.url as string, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to mongoDB');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect');
    Logging.error(error);
  });

const StartServer = () => {
  app.use((req, res, next) => {
    // log the request
    Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}]`);

    res.on('finish', () => {
      // log the response
      Logging.info(
        `Outgoing -> Method: [${req.method}] - Url: [${req.url}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  /** Rules of our API */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }

    next();
  });

  // Routes

  // Healthcheck
  app.get('/ping', (req, res, next) =>
    res.status(200).json({ message: 'pong' })
  );

  // Error Handling

  app.listen(process.env.PORT, () => {
    Logging.info(`Server started on port ${config.server.port}`);
  });
};
