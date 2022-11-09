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
.get('/login',login) // users/login
.get('/register',register)
.post('/register/add',registerValidator,processRegister)
.post('/login',loginValidator,processLogin)
/*   

  .put('/update/:id', update)

 
  .get('/profile',userSessionCheck,profile) // /users/profile
  .put('/profile/:id',upload.single('avatar'),profileValidator,updateEdit)
  .get('/logout',logout) */
  
module.exports = router;
