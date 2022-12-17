const express = require('express');
const router = express.Router();
/* const productsValidation = require('../validations/productsValidator') */
const {filter,detail,store,create,editProduct, updateEdit, remove, search,carrito} = require('../controllers/productController');
const {adminCheck } = require('../middlewares')
/* /products */

router
.get('/detail/:id', detail)
.get('/add',adminCheck,create)
.post('/add/store',store)
.get('/edit/:id', adminCheck, editProduct)
.put('/update/:id', updateEdit)
.delete('/delete/:id', remove)
.get('/search', search)
.get('/filter', filter)
.get('/shopping-cart', carrito)

     
module.exports = router