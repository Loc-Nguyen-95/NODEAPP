const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

router.get('/add-product', adminController.getFormAdd);

router.post('/post-add-product', adminController.saveProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEdit);

router.post('/edit-product', adminController.postEdit);

router.post('/delete-product', adminController.postDelete)

module.exports = router;