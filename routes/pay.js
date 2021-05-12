const express = require('express');
const init = require('../controllers/init');
const success = require('../controllers/success');
const failed = require('../controllers/failed');

const router = express.Router();

router.get('/', init);
router.get('/success', success);
router.get('/failed', failed);

module.exports = router;
