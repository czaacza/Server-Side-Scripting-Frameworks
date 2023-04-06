require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
  {
    username: 'admin',
    title: 'Post 1',
  },
  {
    username: 'Jim',
    title: 'Post 2',
  },
];

app.get('/posts', authenticateToken, (req, res) => {
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

  res.json({ accessToken: accessToken });
});

app.post('/register', (req, res) => {
  // Register User
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const bearer = req.headers['authorization'];

  const token = bearer && bearer.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log('succesfully authenticated, user:', user);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
