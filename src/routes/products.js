const express = require('express');
const router = express.Router();
/* const productsValidation = require('../validations/productsValidator') */
const {filter,detail,store,create,editProduct, updateEdit, remove, search,carrito} = require('../controllers/productController');
const {adminCheck, upload } = require('../middlewares');
/* /products */

router
.get('/detail/:id', detail)
.get('/add',/*adminCheck*/create)
.get('/edit/:id', /*adminCheck*/ editProduct)
.put('/update/:id', updateEdit)
.delete('/delete/:id', remove)
.get('/search', search)
.get('/filter/:id', filter)
.get('/cart', carrito)

     
module.exports = router