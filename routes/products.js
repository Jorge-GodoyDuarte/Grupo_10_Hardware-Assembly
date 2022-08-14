const express = require('express');
const router = express.Router();

const {detail,carrito} = require('../controllers/productController')

/* /products */

router
    .get('/detail', detail)
    .get('/shopping-cart', carrito)

module.exports = router