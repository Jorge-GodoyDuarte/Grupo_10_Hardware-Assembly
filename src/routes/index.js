const express = require('express');
const router = express.Router();


const {home,terms} = require('../controllers/indexController')

/* / */
router.get('/',home);
router.get('/terms',terms);

module.exports = router;
