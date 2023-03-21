import {getCoordinates} from '../src/middlewares';
require('dotenv').config();
import express from 'express';

const app = express();

app.use(getCoordinates);

app.listen(11000, () => {
  console.log('app listening on port 11000');
});
