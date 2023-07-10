# NODEAPP - :man_shrugging: Part4 (2): Async Request

Gửi yêu cầu bất đồng bộ (xử lí bất đồng bộ)
Không làm gián đoạn các quá trình khác

user:
- gửi yêu cầu bất đồng bộ fetch...then...catch...(promise)
- data yêu cầu json body

server: 
- xử lí yêu cầu bất đồng bộ và data json
- Trả data dạng json chứ không render page


FE: script tag
    function deleteProduct (btn) {
        const prodId = btn.parentNode.querySelector('[name=productId]').value;
        const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

        const productElement = btn.closest('article');

        fetch('/admin/product/' + prodId, {
            method: 'DELETE',
            headers: {
                'csrf-token' : csrf
            }
        })
        .then(result => {
            return result.json()
        })
        .then(data => {
            console.log(data);
            productElement.parentNode.removeChild(productElement);
        })
        .catch(err => {
            console.log(err);
        })
    }

BE: deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then( product => {
        if !product
            return next()
        fileHelper.deleleFile(product.imageUrl);
        return Product.deleteOne({_id: prodId, userId: req.user._id})
        .then(() => {
            console.log('Destroyed product');
            res.status(200).json({message: 'Success !'})
        })
        .catch(err => {
            res.status(500).json({message: 'Deleting product failed'})
        })
    })
}



