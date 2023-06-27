const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./model/user')

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
    User.findById('644e3ba2bb7c9a62ae805995')
    .then( user => {
        // lưu thông tin user vào object req
        req.user = new User(user.name, user.email, user.cart, user._id);
        next()
    })
    .catch(err => console.log(err))
})

// use midleware
app.use('/admin', adminRoutes);
app.use(shopRoutes)

// app.listen(5001);
mongoConnect(() => app.listen(5001));