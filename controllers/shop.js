const Product = require('../model/product');
const Cart = require('../model/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
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

exports.postCart = (req, res, next) => {
    const id = req.body.productId;
    Product.findById(id)
    .then(product => {
        console.log('--> product', product)
        return req.user.addProduct(product);
    }
    ) 
    res.redirect('/cart')
}

exports.getCart = (req, res, next) => {
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find(
    //                 prod => prod.id === product.id
    //             )
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product, qty: cartProductData.qty })
    //             }
    //         }
    req.user.getCart() 
    .then(products => {
        res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart',
            products: products
        })
    })
    .catch(err => console.log(err))
    //     })
    // })
}

exports.postDeleteCart = (req, res, next) => {
    const id = req.body.prodId;
    // console.log(id)
    // Product.findById(id, product => {
    //     Cart.deleteProductInCart(id, product.price)
    // })
    // res.redirect('/')
    req.user
    .deleteItemInCart(id)
    .then(result => {
        res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

//ORDER 

//1. post
exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/order')
        })
        .catch(err => console.log(err))
}

//2. get
exports.getOrder = (req, res, next) => {
    req.user.getOrder() // thật ra đến đây đã có dữ liệu orders rồi
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