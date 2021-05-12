const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('will pay here');
});

module.exports = router;
