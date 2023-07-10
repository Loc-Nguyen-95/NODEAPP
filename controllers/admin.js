const Product = require('../model/product'); 
const fileHelper = require('../util/file');

//(1)
exports.getFormAdd = (req, res, next) => {
    // console.log('hello');
    res.render('admin/add-product', {
        path: '/admin/add-product',
        pageTitle: 'Add product',
        editing: false,
        isAuth: req.session.isLoggedIn
    })
}

exports.saveProduct = (req, res, next) => {
    console.log('hello')
    const title = req.body.title;
    const imageUrl = req.file.path;
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
    .catch(err => next(new Error(err)))
}
 
//(*)
exports.getProducts = (req, res, next) => {
    Product.find() 
    .then(products => {
        // console.log('--products', products)
        res.render( 'admin/products' , {
            pageTitle: 'Admin products',
            path: '/admin/products',
            prods: products,
            isAuth: req.session.isLoggedIn
        }) 
    })
    .catch(err => next(new Error(err)))
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
                product: product,
                isAuth: req.session.isLoggedIn
            })
        }
    )
    .catch(err => next(new Error(err)))
}

exports.postEdit = (req, res, next) => {
    // console.log(req.body);
    const id = req.body.prodId; 

    const updatedTitle = req.body.title;
    const image = req.file;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.desc;

    console.log('test', image) 
    // const newProduct = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDesc, id); // Có id 
    // newProduct.save()
    Product.findById(id)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.desc = updatedDesc;
        if(image){
            fileHelper.deleteFile(product.imageUrl);
            product.imageUrl = image.path;
        }
        return product.save();
    })
    .then(result => {
        console.log('Updated Product ! ')
        res.redirect('/admin/products')
    })
    .catch(err => next(new Error(err)))
}

//(3)
exports.postDelete = (req, res, next) => { 
    // console.log('--> delete product');
    const id = req.params.productId;
    Product.findById(id)
    // .then(() => {
    //     res.redirect('/admin/products');
    // })
    // .catch(err => next(new Error(err)))
    .then(product => {

        if(!product){
            return next(new Error('Product not found.'));
        }
        fileHelper.deleteFile(product.imageUrl);
        return Product.deleteOne({_id: id, userId: req.user._id});
    }) 
    .then(() => {
        console.log('Destroyed product !');
        res.status(200).json({message: 'Success !'});
    })
    .catch(err => {
        res.status(500).json({message: 'Deleting product failed.'})
    })
}
