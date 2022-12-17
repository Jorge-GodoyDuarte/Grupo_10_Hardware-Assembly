// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {verifyEmail} = require('../../controllers/apis/apiUserController');

// /api/users

router
    .post('/verify-email',verifyEmail)

module.exports = router;
