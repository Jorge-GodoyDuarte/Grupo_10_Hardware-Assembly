const express = require('express');
const router = express.Router();
/* const productsValidation = require('../validations/productsValidator') */
const {filter,detail,store,create,editProduct, updateEdit, remove, search,carrito} = require('../controllers/productController');
const {adminCheck, upload } = require('../middlewares');
/* /products */
const {uploadImgProduct} = require('../middlewares/uploadFiles')
router
.get('/detail/:id', detail)
.get('/add',adminCheck,create)
.post('/add', uploadImgProduct.array('imageupload'),store)
.get('/edit/:id', adminCheck,editProduct)
.put('/update/:id', updateEdit)
.delete('/delete/:id', remove)
.get('/search', search)
.get('/filter/:id', filter)
.get('/cart', carrito)

     
module.exports = router