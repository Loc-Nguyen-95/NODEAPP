const fs = require('fs');

const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {

    static addProduct(id, productPrice) {
        fs.readFile(p, (err, content) => {
            
            let cart = { products: [], totalPrice: 0 }

            if(!err){
                cart = JSON.parse(content);
            } 

            const Index = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[Index];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[Index] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + productPrice;

            fs.writeFile (p, JSON.stringify(cart), err => {
                console.log('write cart error: ', err)
            })
        })    
    }

    static getCart(cb) {
        fs.readFile(p, (err, content) => {
            const cart = JSON.parse(content);
            if(err){
                cb(null)
            } else {
                cb(cart)
            }
        })
    }

    static deleteProductInCart (id, productPrice) { 
        fs.readFile(p, (err, content) => {
            if(err){
                return;
            }
            const updatedCart = {...JSON.parse(content)};
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            )
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log('error in write cart: ', err)
            })
        })
    }
}

module.exports = Cart;

