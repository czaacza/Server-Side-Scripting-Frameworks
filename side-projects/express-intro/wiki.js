// wiki router
const express = require('express');
const router = express.Router();

// home page route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the wiki page' });
});

router.get('/about', (req, res) => {
  res.json({ message: 'About this wiki' });
});

module.exports = router;
