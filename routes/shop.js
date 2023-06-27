const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex); 

router.get('/cart', shopController.getCart);

router.post('/post-cart', shopController.postCart);

router.post('/post-delete-cart', shopController.postDeleteCart);

// order
router.get('/order', shopController.getOrder);

router.post('/post-order', shopController.postOrder)

module.exports = router;