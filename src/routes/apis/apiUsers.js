// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {verifyEmail} = require('../../controllers/APIs/apiUsersController');

// /api/users

router
    .post('/verify-email',verifyEmail)

module.exports = router;
