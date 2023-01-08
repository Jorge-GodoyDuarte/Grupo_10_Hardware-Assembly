// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list,detail,store,update,remove, getImage } = require('../../controllers/APIs/apiProductsController');


// /api/products

router
    .get('/', list)
/*     .get('/:id', detail)
    .post('/',store)
    .patch('/',update)
    .delete('/',remove)
    .get('/image/:image',getImage)

 */
module.exports = router;
