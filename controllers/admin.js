const Product = require('../model/product'); 

//(1)
exports.getFormAdd = (req, res, next) => {
    res.render('admin/add-product', {
        path: '/admin/add-product',
        pageTitle: 'Add product',
        editing: false
    })
}

exports.saveProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const desc = req.body.desc;

    const product = new Product({
        title: title,
        price: price,
        desc: desc,
        imageUrl: imageUrl,
        userId: req.user
    });
  
    product.save()
    .then(result => res.redirect('/admin/products'))
    .catch(err => console.log(err))

}
 
//(*)
exports.getProducts = (req, res, next) => {
    Product.find() 
    .then(products => {
        // console.log('--products', products)
        res.render( 'admin/products' , {
            pageTitle: 'Admin products',
            path: '/admin/products',
            prods: products
        }) 
    })
    .catch(err => console.log(err))
}

//(2)
exports.getEdit = (req, res, next) => {
    const prodId = req.params.productId;
    // console.log('--prodId', prodId);
    Product.findById(prodId)
    .then(product => {
        console.log('--> product pass in form edit: ', product)
        if(!product) {
            return res.redirect('/')
        }
            res.render('admin/add-product', {
                pageTitle: 'Edit product',
                path: '/admin/edit-product', //?
                editing: true,
                product: product
            })
        }
    )
     .catch(err => console.log(err))
}

exports.postEdit = (req, res, next) => {
    // console.log(req.body);
    const id = req.body.prodId; 

    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.desc;

    // const newProduct = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDesc, id); // Có id 
    // newProduct.save()
    Product.findById(id)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.desc = updatedDesc;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })
    .then(result => {
        console.log('Updated Product ! ')
        res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

//(3)
exports.postDelete = (req, res, next) => {
    const id = req.body.productId;
    Product.findByIdAndRemove(id)
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err))
    // res.redirect('/admin/products')
}