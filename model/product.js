const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    }, 
    price: {
        type: Number,
        require: true
    },
    desc: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        reauire: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
})

//Các phương thức khi chưa sd mongoose: 
    // fetchAll()
    // save()
    // findById()
    // deleteProduct()
// Sẽ được thay thế bằng các phương thức của mongoose 

module.exports = mongoose.model('Product', productSchema)