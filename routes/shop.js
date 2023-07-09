const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

const authMiddleware = require('../middleware/is-auth');


router.get('/', shopController.getIndex); 

//cart
router.get('/cart', authMiddleware, shopController.getCart);

router.post('/post-cart', authMiddleware, shopController.postCart);

router.post('/post-delete-cart', authMiddleware, shopController.postDeleteCart);

// order
router.get('/order', authMiddleware, shopController.getOrder);

router.post('/post-order', authMiddleware, shopController.postOrder);

//Invoice
router.get('/order/:orderId', shopController.getInvoice)

module.exports = router; 