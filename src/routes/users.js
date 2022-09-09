var express = require('express');
var router = express.Router();


const {login, processLogin,logout, register, processRegister, update} = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');

const registerValidator=require('../validations/registerValidator')

const upload = require('../middlewares/uploadFiles')


/* /users */
router
  .get('/register',register)
  .post('/register',registerValidator,processRegister)
  .put('/update/:id',upload.single('avatar'), update)
  .get('/login',login)
  .post('/login',loginValidator,processLogin)
  .get('/logout',logout)
  
module.exports = router;
