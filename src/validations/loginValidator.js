const {check, body} = require('express-validator')
const {loadUsers}= require('../data/db_Module')
const {compareSync}=require('bcryptjs')

module.exports =[

        body('email')
            .notEmpty().withMessage('El email es obligatorio').bail()
            .isEmail().withMessage('Debe ser un email valido').bail(),

        body('password')
            .notEmpty().withMessage('La contraseña es obligatoria').bail()
            .isLength({
                min:6,
                max:12
            }).withMessage('La contraseña debe tener entre 6 y 12 caracteres')
            .custom((value,{req})=>{
                const user = loadUsers().find(user => user.email === req.body.email && compareSync(value,user.password));
                return !user ? false:true
            }).withMessage('Credenciales invalidas')



]