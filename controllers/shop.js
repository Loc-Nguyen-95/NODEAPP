const Product = require('../model/product');

const Order = require('../model/order');

//(*)
exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            })
        }
        )
        .catch(err => console.log(err))
}

//CART
// (1)
exports.postCart = (req, res, next) => {
    const id = req.body.productId;
    Product.findById(id)
        .then(product => {
            // console.log('--> product', product)
            return req.user.addToCart(product);
        }
        )
    res.redirect('/cart')
}

//(2)
exports.getCart = (req, res, next) => { // Get toàn bộ cart items 
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            console.log('products pass to cart: ', products)
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: products
            })
        })
        .catch(err => console.log(err))
}

//(3)
exports.postDeleteCart = (req, res, next) => {
    const id = req.body.prodId;
    req.user
        .removeFromCart(id)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

//ORDER 

//1. post
exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => { // thực hiện lấy items cart trong schema user
            const products = user.cart.items.map(item => {
                return {product: { ...item.productId._doc}, quantity: item.quantity }
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user // ??
                },
                products: products
            })
            return order.save();
        })
        // .addOrder()
        .then(result => req.user.clearCart())
        .then(() => {
            res.redirect('/order')
        })
        .catch(err => console.log(err))
}

//2. get
exports.getOrder = (req, res, next) => {
    // req.user.getOrder() // thật ra đến đây đã có dữ liệu orders rồi
    Order.find({'user.userId' : req.user._id })
        .then(orders => {
            console.log('orders: ', orders)
            res.render('shop/order', {
                pageTitle: 'Order',
                path: '/order',
                orders: orders
            })
        })
        .catch(err => console.log(err))
}