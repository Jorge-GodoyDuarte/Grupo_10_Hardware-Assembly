const { check } = require('express-validator')

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min: 5
        }).withMessage('Cómo mínimo 5 caracteres'),
    check('price')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isNumeric({
        }).withMessage('Debe ser un número entero positivo'),

    check('discount')
        .isInt({
            min: 0,
            max: 100
        }).withMessage('El descuento no puede ser mayor que 100').bail()
        .isNumeric({
            no_symbols: true,
        }).withMessage('Debe ser un número entero positivo'),

    check('description')
        .notEmpty().withMessage('Coloca una descripción a tu producto').bail()
        .isLength({
            min: 20,
        }).withMessage('Cómo mínimo 5 caracteres'),

    check('category')
        .notEmpty().withMessage('La categoría es obligatoria'),

    check('brands')
        .notEmpty().withMessage('La marca es obligatoria'),

]