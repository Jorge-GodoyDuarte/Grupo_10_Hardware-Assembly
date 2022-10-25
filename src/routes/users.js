var express = require('express');
var router = express.Router();


const {login, processLogin,logout, register, processRegister, update, profile, updateEdit} = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');

const registerValidator = require('../validations/registerValidator')
const profileValidator = require('../validations/profileValidator')
const userSessionCheck = require('../middlewares/userSessionCheck');
const upload = require('../middlewares/uploadFiles');
const userController = require('../controllers/userController');
/* /users */
router
  
  .get('/register',userController.register)
  .post('/register',registerValidator,processRegister)
  .put('/update/:id', update)
  .get('/login',login) // users/login
  .post('/login',loginValidator,processLogin)
  .get('/profile',userSessionCheck,profile) // /users/profile
  .put('/profile/:id',upload.single('avatar'),profileValidator,updateEdit)
  .get('/logout',logout)
  
module.exports = router;
