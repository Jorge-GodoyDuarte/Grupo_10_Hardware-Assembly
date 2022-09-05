var express = require('express');
var router = express.Router();


const {login, processLogin,logout, register, processRegister} = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');

const registerValidator=require('../validations/registerValidator')

/* /users */
router
  .get('/register',register)
  .post('/register',registerValidator,processRegister)
  .get('/login',login)
  .post('/login',loginValidator,processLogin)
  .get('/logout',logout)
  
module.exports = router;
