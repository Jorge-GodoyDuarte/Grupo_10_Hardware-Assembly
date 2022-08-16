var express = require('express');
var router = express.Router();


const {login, register} = require('../controllers/userController')

/* /users */
router
  .get('/register', register)
  .get('/login', login)
  
module.exports = router;
