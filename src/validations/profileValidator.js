const { check, body } = require("express-validator");

module.exports = [
  check("firstName")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({
      min: 5,
    })
    .withMessage("Cómo mínimo 5 caracteres"),
  check("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({
      min: 5,
    })
    .withMessage("Cómo mínimo 5 caracteres"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({
      min: 6,
      max: 12,
    })
    .withMessage("La contraseña debe tener entre 6 y 12 caracteres"),

  body("password2")
    .notEmpty()
    .withMessage("Debe confirmar la contraseña")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Las contraseñas no coinciden"),
];
