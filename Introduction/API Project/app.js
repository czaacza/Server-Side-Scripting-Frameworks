require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');

// app.get('/api', (req, res) => {
//   res.json({
//     success: 1,
//     message: 'This is REST api working',
//   });
// });
app.use(express.json());

app.use('/api/users', userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log('Server up and running on PORT:', process.env.APP_PORT);
});
