const { check, body } = require("express-validator");
const { loadUsers } = require("../data/db_Module");
const { compareSync } = require("bcryptjs");
const db = require("../database/models");
module.exports = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un email valido")
    .bail(),

  body("password")
    .notEmpty()
    .withMessage("Debes ingresar tu contraseña")
    .bail()
    .custom( (value,{req}) => {
      return db.User.findOne({
          where : {
              email : req.body.email
          }
        }).then( user => {
              if(!user || !compareSync(value, user.password)) {
                  return Promise.reject()
              }
        }).catch( () => Promise.reject('Credenciales inválidas'))
  })
];
