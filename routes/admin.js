const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

const authMiddleware = require('../middleware/is-auth');

router.get('/add-product', authMiddleware, adminController.getFormAdd);

router.post('/post-add-product', authMiddleware, adminController.saveProduct);

router.get('/products', authMiddleware, adminController.getProducts);

router.get('/edit-product/:productId', authMiddleware, adminController.getEdit);

router.post('/edit-product', authMiddleware, adminController.postEdit);

router.delete('/product/:productId', authMiddleware, adminController.postDelete)

module.exports = router;