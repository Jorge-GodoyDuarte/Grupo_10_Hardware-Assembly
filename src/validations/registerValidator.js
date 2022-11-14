const {check, body} = require('express-validator')
const db = require('../database/models')

module.exports =[
    check('firstname')
        .notEmpty().withMessage('El nombre es obligatorio')
        .bail()
        .isLength({
            min:3
        })
        .withMessage('Minimo 3 caracteres')
        .bail()
        .isAlpha('es-ES',{ignore : " "})
        .withMessage('Sólo caracteres alfabeticos'),

        check('lastname')
        .notEmpty()
        .withMessage('El apellido es obligatorio')
        .bail()
        .isLength({
            min:3
        })
        .withMessage('Minimo 3 caracteres')
        .bail()
        .isAlpha('es-ES',{ignore : " "})
        .withMessage('Sólo caracteres alfabeticos'),

        check('street')
        .notEmpty()
        .withMessage('Coloca una calle')
        .bail()
        .isAlpha('es-ES',{ignore : " "})
        .withMessage('Sólo caracteres alfabeticos'),
             
        check('city')
        .notEmpty()
        .withMessage('Coloca una ciudad')
        .bail()
        .isAlpha('es-ES',{ignore : " "})
        .withMessage('Sólo caracteres alfabeticos'),

        check('phone')
        .notEmpty()
        .withMessage('El numéro es obligatorio')
        .bail()
        .isNumeric()
        .withMessage('Debe contener sólo números'),

        body('email')
            .notEmpty()
            .withMessage('El email es obligatorio')
            .bail()
            .isEmail()
            .withMessage('Debe ser un email valido')
            .bail()
            .custom((value,{req}) => {
                return db.User.findOne({
                    where : {
                        email : value.trim()
                    }
                }).then(user => {
                    if(user){
                        return Promise.reject()
                      }
                }).catch(error =>{
                    console.log(error)
                    return Promise.reject('Este email ya se encuentra registrado!')
                })
            }),

            check('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria')
            .bail()
            .isLength({
                min:6,
                max:12
            }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

            body('password2')
            .notEmpty()
            .withMessage('Debe confirmar la contraseña')
            .custom((value,{req})=>{
                if(value!==req.body.password){
                    return false
                }
                return true
            }).withMessage('Las contraseñas no coinciden')
]