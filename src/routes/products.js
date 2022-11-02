const express = require('express');
const router = express.Router();
/* const productsValidation = require('../validations/productsValidator') */
const {detail,store,create} = require('../controllers/productController');

/* /products */

router
.get('/detail/:id', detail)
.get('/add',create)
.post('/add/store',store)








/*     .put('add/:id', productsValidation , updateEdit)
    .get('/edit/:id', edit)
    .put('/update/:id',productsValidation, updateEdit)
    
    .get('/shopping-cart', carrito)
    .get('/filter', filter)
    .get('/search', search)
    .delete('/delete/:id',remove) */ 
module.exports = router