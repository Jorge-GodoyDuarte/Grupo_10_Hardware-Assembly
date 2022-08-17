const express = require('express');
const router = express.Router();

const {detail,carrito, filter, search} = require('../controllers/productController')

/* /products */

router
    .get('/detail/:id', detail)
    .get('/shopping-cart', carrito)
    .get('/filter', filter)
    .get('/search', search)
module.exports = router