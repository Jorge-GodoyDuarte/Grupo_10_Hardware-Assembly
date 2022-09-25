var express = require('express');
var router = express.Router();


const {login, processLogin,logout, register, processRegister, update, profile} = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');

const registerValidator=require('../validations/registerValidator')


const {upload} = require('../middlewares/uploadFiles')

const userSessionCheck = require('../middlewares/userSessionCheck');

/* /users */
router
  
  .get('/register',register)
  .post('/register',upload.single('avatar'),registerValidator,processRegister)
  .put('/update/:id', update)
  .get('/login',login) // users/login
  .post('/login',loginValidator,processLogin)
  .get('/profile',userSessionCheck,profile) // /users/profile
  .put('/profile/:id', upload.single('avatar'),update)
  .get('/logout',logout)
  
module.exports = router;
