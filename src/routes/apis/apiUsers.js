// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {getAll, verifyEmail} = require('../../controllers/APIs/apiUserController');

// /api/users

router
    .get('/', getAll)
    .get('/:id' )
    .post('/verify-email',verifyEmail)

module.exports = router;
