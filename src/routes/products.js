const express = require('express');
const router = express.Router();
const productsValidation = require('../validations/productsValidator')
const {detail,carrito, filter, search, add, store, edit, update, remove} = require('../controllers/productController')

/* /products */

router
    .get('/add',add)
    .post('/add',store)
    .get('/edit/:id',edit)
    .put('/update/:id', update)
    .get('/detail/:id', detail)
    .get('/shopping-cart', carrito)
    .get('/filter', filter)
    .get('/search', search)
    .delete('/delete/:id',remove)
module.exports = router