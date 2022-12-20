var express = require('express');
var router = express.Router();


const {login, processLogin,logout, register, processRegister, profile, updateEdit} = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator')
const profileValidator = require('../validations/profileValidator')

/* MIDDLEWARES  */
const { userCheck, checkRedirect, adminCheck } = require('../middlewares');
const { Panel, editAdmin, ProductList } = require('../controllers/adminController');

/* /users */

router
.get('/login',checkRedirect,login) // users/login
.get('/register', checkRedirect, register)
.post('/register/add',registerValidator,processRegister)
.post('/login',loginValidator,processLogin)
.get('/logout',logout) 
.get('/profile',userCheck,profile) // /users/profile
.put('/profile/:id',/* upload.single('avatar'), */profileValidator,updateEdit)

/* PANEL ADMIN */
.get('/panel',Panel)
.put('/panel/:id',editAdmin)
.get('/panelProducts',ProductList)
  
module.exports = router;
