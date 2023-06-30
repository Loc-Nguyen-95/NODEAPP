const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');


const bodyParser = require('body-parser');

// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');
const User = require('./model/user');

//session
const session = require('express-session');

const MongodbStore = require('connect-mongodb-session')(session);
const MONGO_URI = 'mongodb+srv://Loc_nguyen:mDEMfSQT_Dr5est@cluster0.xrlivxz.mongodb.net/shop';
const store = new MongodbStore({
    uri: MONGO_URI,
    collection: 'sessions'
})

//csurf + connect-flash
const csrf = require('csurf');
const csrfProtection = csrf()
const flash = require('connect-flash');

// call express
const app = express();

//body parser 
app.use(bodyParser.urlencoded({ extended: false })) // string/array ??

//static file
app.use(express.static(path.join(__dirname, 'public')))

//view engine
app.set('view engine', 'ejs'); //view engine: ejs 
app.set('views', 'views');     //views : views folder

//Use midleware

//* app.use ... session()
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}))

//
app.use(csrfProtection);
app.use(flash());

//* Login with session 
app.use((req, res, next) => {
    // Kiểm tra session
    if(!req.session.user){  // Schema session = req.session
        console.log('Không có user trong sesson !')
        // return res.end(); // Nên báo lỗi ??
        return next();
    } 
    User.findById(req.session.user._id)
        .then(user => {
            // console.log('Tim thay user trong schema User')
            req.user = user;
            next()
        })
        .catch(err => console.log(err))
})

//csurf attack
app.use((req, res, next) => {
    res.locals.isAuth = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404)

// app.listen(5001);
// mongoConnect(() => app.listen(5001));
mongoose
    .connect(MONGO_URI)
    .then(result => {
        // console.log('Connected to MongoDb !')
        // User.findOne()
        //     .then(user => {
        //         if (!user) {
        //             const user = new User({
        //                 name: "Test",
        //                 email: 'test@123.com',
        //                 cart: { items: [] }
        //             });
        //             user.save()
        //         }
        //     })
        app.listen(5001)
    })
    .catch(err => console.log(err))