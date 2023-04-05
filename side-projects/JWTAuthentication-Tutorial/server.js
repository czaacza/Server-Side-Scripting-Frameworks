require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
  {
    username: 'John',
    title: 'Post 1',
  },
  {
    username: 'Jim',
    title: 'Post 2',
  },
];

app.get('/posts', (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.get('/login', (req, res) => {
  res.send('Login');
});

app.post('/login', authenticateToken, (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  console.log('accessToken: ', accessToken);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const bearer = req.headers['authorization'];
  if (bearer == null) return res.sendStatus(401);

  const token = bearer.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log('token:', token);

    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
