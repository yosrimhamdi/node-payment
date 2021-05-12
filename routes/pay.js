const express = require('express');
const paypal = require('paypal');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('will pay here');
});

module.exports = router;
