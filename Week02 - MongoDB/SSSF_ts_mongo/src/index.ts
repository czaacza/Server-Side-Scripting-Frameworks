import app from './app';
import mongoConnect from './utils/db';

const port = process.env.PORT || 3000;

// Self invoking function
(async () => {
  try {
    await mongoConnect();
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  } catch (err) {
    console.log('Server error', (err as Error).message);
  }
})();
