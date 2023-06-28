const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                require: true,
                ref: 'Product'
            },
            quantity: {type: Number, require: true}
        }]
    }
})
userSchema.methods.addToCart = function(product) {
    const Index = this.cart.items.findIndex(p => p.productId.toString() === product._id.toString());
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];
    if(Index >= 0){
        newQty = this.cart.items[Index].quantity + 1;
        updatedCartItems[Index].quantity = newQty;
    } else {
        updatedCartItems.push({ 
            productId: product._id,
            quantity: newQty
        })
    }
    const updatedCart = {
        items: updatedCartItems
    }
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function(id){
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== id.toString() )
    this.cart.items = updatedCartItems;
    return this.save()
}

userSchema.methods.clearCart = function() { 
    this.cart = {items: []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
