const express = require('express');
const router = express.Router();

const {home, Terms} = require('../controllers/indexController')

/* / */
router.get('/',home);
router.get('/terms', Terms)
module.exports = router;
