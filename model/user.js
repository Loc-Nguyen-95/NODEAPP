const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {
                console.log('--> user:', user);
                return user;
            })
            .catch(err => {
                console.log('--> err in find user:', err)
            })
    }

    // static addProduct(id, productPrice) {
    addProduct(product) {
        // fs.readFile(p, (err, content) => {
        // let cart = { products: [], totalPrice: 0 }
        // if (!err) {
        //     cart = JSON.parse(content);
        // }
        const Index = this.cart.items.findIndex(p => p.productId.toString() === product._id.toString());
        // const existingProduct = cart.products[Index];
        // let updatedProduct;
        let newQty = 1;
        const updatedItems = [...this.cart.items]

        if (Index >= 0) {
            // updatedProduct = { ...existingProduct };
            // updatedProduct.qty = updatedProduct.qty + 1;
            // cart.products = [...cart.products];
            // cart.products[Index] = updatedProduct;
            newQty = this.cart.items[Index].quantity + 1;
            updatedItems[Index].quantity = newQty;
        } else {
            // updatedProduct = { id: id, qty: 1 };
            // cart.products = [...cart.products, updatedProduct]
            updatedItems.push({
                productId: new ObjectId(product._id),
                quantity: newQty
            })
        }

        // cart.totalPrice = cart.totalPrice + productPrice;

        // fs.writeFile(p, JSON.stringify(cart), err => {
        //     console.log('write cart error: ', err)
        // })
        const updatedCart = {
            items: updatedItems
        }

        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            )

        // })
    } 

    getCart() { //Chú ý!! Dùng cách lồng data products để get toàn bộ data của products, quantity của cart

        // fs.readFile(p, (err, content) => {
        //     const cart = JSON.parse(content);
        //     if(err){
        //         cb(null)
        //     } else {
        //         cb(cart)
        //     }
        // })
        const db = getDb();
        const productIds = this.cart.items.map(item => item.productId); //của cart 
        return db
            .collection('products')
            .find({ _id: { $in: productIds } }) //find nhiều, trong collection products 
            .toArray()
            .then(products => { //của products
                return products.map(p => {
                    return { ...p, quantity: this.cart.items.find(item => {
                            return item.productId.toString() === p._id.toString();
                        }).quantity
                    }
                })
            })
    }

    // static deleteProductInCart (id, productPrice) { 
    deleteItemInCart(id) {
        // fs.readFile(p, (err, content) => {

        // if(err){
        //     return;
        // }

        // const updatedCart = {...JSON.parse(content)};

        // const product = updatedCart.products.find(prod => prod.id === id);
        // if (!product) {
        //     return;
        // }
        // const productQty = product.qty;
        // updatedCart.products = updatedCart.products.filter(
        //     prod => prod.id !== id
        // )
        const updatedItems = this.cart.items.filter(item => {  // List item in cart 
            return item.productId.toString() !== id.toString();
        });

        // updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

        // fs.writeFile(p, JSON.stringify(updatedCart), err => {
        //     console.log('error in write cart: ', err)
        // })
        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: { items: updatedItems } } } // set toàn bộ items (của cart) cho user 
            )
        // })
    }

    addOrder() {
        const db = getDb();
        return this.getCart() // DÙNG LẠI METHOD
            .then(products => { // toàn bộ products của cart đã được map
                console.log('products in cart: ', products)
                const order = {  // thành lập order
                    items: products,
                    user: {
                        _id: new ObjectId(this._id),
                        name: this.name
                    }
                }
                return db
                    .collection('orders')
                    .insertOne(order) // insert 
            })
            .then(result => {

                this.cart = { items: [] } // promise thứ 2 thực hiện xoá item của cart 

                return db // xoá cart item của user = update ??
                    .collection('users')
                    .updateOne(
                        { _id: new ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }
                    )
            })
    }

    getOrder () {
        const db = getDb();
        return db
            .collection('orders')
            .find({'user._id' : new ObjectId(this._id)})
            .toArray()
            //.then(orders => ... ) ??
    }

}//end

module.exports = User;