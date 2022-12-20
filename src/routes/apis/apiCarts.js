// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list,addItem,removeAllItems,removeQuantity} = require('../../controllers/APIs/apiCartsController');

// /api/carts

router
    .get('/', list)
    .post('/',addItem)
    .delete('/:id',removeQuantity)
    .delete('/all',removeAllItems)

module.exports = router;