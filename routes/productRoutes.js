'use strict';

const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

const { getProducts, getProduct, addProduct, updateProduct, deleteProduct, getTopViewedProducts } = productController;

router.get('/products', getProducts);
router.get('/product/:id/:currency?', getProduct);
router.post('/product', addProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/products/top', getTopViewedProducts);

module.exports = {
    routes: router
}