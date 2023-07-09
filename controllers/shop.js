const Product = require('../model/product');
const Order = require('../model/order');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

//(*) 
exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                isAuth: req.session.isLoggedIn
            })
        }
        )
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            console.log(error)
            return next(error)
        })
}

//CART
// (1)
exports.postCart = (req, res, next) => {
    const id = req.body.productId;
    Product.findById(id)
        .then(product => {
            // console.log('--> product', product)
            return req.user.addToCart(product);
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => next(new Error(err)))
}

//(2)
exports.getCart = (req, res, next) => { // Get toàn bộ cart items 
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            console.log('--> products pass to cart: ', products)
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: products,
                isAuth: req.session.isLoggedIn
            })
        })
        .catch(err => next(new Error(err)))
}

//(3)
exports.postDeleteCart = (req, res, next) => {
    const id = req.body.prodId;
    req.user
        .removeFromCart(id)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => next(new Error(err)))
}

//ORDER 

//1. post
exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => { // thực hiện lấy items cart trong schema user
            const products = user.cart.items.map(item => {
                return { product: { ...item.productId._doc }, quantity: item.quantity }
            });
            console.log('--> products in order:', products);
            console.log(req.user)
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            })
            console.log('--> order:', order)
            return order.save();
        })
        // .addOrder()
        .then(result => req.user.clearCart())
        .then(() => {
            res.redirect('/order')
        })
        .catch(err => next(new Error(err)))
}

//2. get
exports.getOrder = (req, res, next) => {
    // req.user.getOrder() // thật ra đến đây đã có dữ liệu orders rồi
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            // console.log('orders: ', orders)
            res.render('shop/order', {
                pageTitle: 'Order',
                path: '/order',
                orders: orders,
                isAuth: req.session.isLoggedIn
            })
        })
        .catch(err => next(new Error(err)))
}

//Invoice
exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then(order => {

            if (!order) {
                return next(new Error('No order found.'))
            }

            if (order.user.userId.toString() !== req.user._id.toString()) {
                return next(new Error('Unauthorized.'));
            }

            const invoiceName = 'invoice-' + orderId + '.pdf';

            const invoicePath = path.join('data', 'invoices', invoiceName);

            const pdfDoc = new PDFDocument(); 

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                'inline; filename="' + invoiceName + '"'
            ); // ?? 
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);
            // make up
            pdfDoc
            .fontSize(26)
            .text('Invoice', {
                underline: true
            });

            pdfDoc
            .text('------------');

            let totalPrice = 0;
            order.products.forEach(prod => {
                totalPrice += prod.quantity * prod.product.price;
                pdfDoc // Tạo dòng: Product Title - Quantity x $Price
                    .fontSize(14)
                    .text(
                        prod.product.title +
                        ' - ' +
                        prod.quantity +
                        ' x ' +
                        '$' +
                        prod.product.price
                    );
            })

            pdfDoc.text('---');
            pdfDoc.fontSize(20).text('Total Price: $' + totalPrice);

            pdfDoc.end();
        })
        .catch(err => {
            console.log(err)
            next(new Error('Error occurred: ', err))
        });
}