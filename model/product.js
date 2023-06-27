// const fs = require('fs');

// const path = require('path');

const mongoDb = require('mongodb'); 

const getDb = require('../util/database').getDb;

// const p = path.join(
//     path.dirname(process.mainModule.filename),
//     'data',
//     'products.json'
// )

// const getDataFromFile = cb => {
//     fs.readFile(p, (err, content) => {
//         // console.log('---> p', p)
//         if(err){
//             // console.log('--> err in get data', err)
//             cb([])
//         } else {
//             // console.log('--> test parse product')
//             cb( JSON.parse(content) )
//         }
//     })
// }


class Product {
    constructor( title, imageUrl, price, desc, id, userId ){ //Note: id và userId ghi sau cùng 
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.desc = desc;
        this._id = id ? new mongoDb.ObjectId(id) : null;
        this.userId = userId;
    }

    static fetchAll () {
        // getDataFromFile(cb)
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log('--> err: ', err)
            })
    }

    save(){
        // getDataFromFile(products => {
        const db = getDb();
        let dbOp;
            if(this._id) {
                dbOp = db
                    .collection('products')
                    .updateOne({_id: this._id}, {$set: this});
                // const Index = products.findIndex(prod => prod.id === this.id);
            
                // let updatedProducts = [...products]; // toán tử spread , nếu truyền dưới dạng biến sẽ được đưa vào mảng mản
                // updatedProducts[Index] = this;
                // fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                //     console.log('error: ', err)
                // })
            } else { 
                dbOp = db.collection('products').insertOne(this)
                // this.id = Math.random().toString();
                // products.push(this);
                // console.log('products', products)
                // fs.writeFile(p, JSON.stringify(products), err => {
                //     console.log('error: ', err);
                // })
            }

            return dbOp
                .then(result => {
                    console.log('result dbOp: ', result)
                })
                .catch(err => {
                    console.log('err dbOp: ', err)
                })
        
    }

    static findById(id) {
        // getDataFromFile(products => {
        //     const product = products.find(p => p.id === id);
        //     cb(product)
        // })
        const db = getDb();
        return db
            .collection('products')
            .find({ _id: new mongoDb.ObjectId(id) })
            .next()
            .then(product => {
                // console.log('--product', product)
                return product
            })
            .catch(err  => {
                console.log('--err:', err)
            })
    }

    static deleteProduct(id) {
    //     getDataFromFile(products => {
    //         const updatedProducts = products.filter(p => p.id !== id);
    //         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //             console.log('err writeFile delete product: ', err)
    //         })
    //     })
    const db = getDb();
    return db 
        .collection('products')
        .deleteOne({_id: new mongoDb.ObjectId(id)})
        .then(result => {
            console.log('--deleted !')
        })
        .catch(err => {
            console.log('--err:', err)
        })
    }

} 

module.exports = Product;


