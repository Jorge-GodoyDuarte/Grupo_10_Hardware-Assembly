const express = require('express');
const router = express.Router();

const {detail,carrito, filter, search, add, store, edit, update} = require('../controllers/productController')

/* /products */

router
    .post('/add', store)
    .get('/add',add)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .get('/detail/:id', detail)
    .get('/shopping-cart', carrito)
    .get('/filter', filter)
    .get('/search', search)
module.exports = router