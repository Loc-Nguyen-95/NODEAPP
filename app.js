const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');

const User = require('./model/user');


// call express
const app = express();

//body parser 
app.use(bodyParser.urlencoded({ extended: false })) // string/array ??

//static file
app.use(express.static(path.join(__dirname, 'public')))

//view engine
app.set('view engine', 'ejs'); //view engine: ejs 
app.set('views', 'views');     //views : views folder

app.use((req, res, next) => {
    User.findById('644e3ba2bb7c9a62ae805995') // Fake login ...
        .then(user => {
            // lưu thông tin user vào object req
            req.user = user; //không cần gọi new vì không phải là class model
            next()
        })
        .catch(err => console.log(err))
})

// use midleware
app.use('/admin', adminRoutes);
app.use(shopRoutes)

// app.listen(5001);
// mongoConnect(() => app.listen(5001));
mongoose
    .connect('mongodb+srv://Loc_nguyen:mDEMfSQT_Dr5est@cluster0.xrlivxz.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        console.log('Connected to MongoDb !')
        User.findOne()
            .then(user => {
                if (!user) {
                    console.log('No user found ! Creating ...')
                    const user = new User({
                        name: "Test",
                        email: 'test@123.com',
                        cart: { items: [] }
                    });
                    user.save()
                }
                console.log('Have atleast one user !')
            })
        app.listen(5001)
    })
    .catch(err => console.log(err))