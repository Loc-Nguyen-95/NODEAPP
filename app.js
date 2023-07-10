const path = require('path');
const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');

// parse-body content 
const bodyParser = require('body-parser');
const multer = require('multer');

// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');
const User = require('./model/user');

//session
const session = require('express-session');

const MongodbStore = require('connect-mongodb-session')(session);
const MONGO_URI = 'mongodb+srv://Loc_nguyen:mDEMfSQT_Dr5est@cluster0.xrlivxz.mongodb.net/shop';

//csurf + connect-flash
const csrf = require('csurf');
const csrfProtection = csrf()
const flash = require('connect-flash');

// call express
const app = express();

const store = new MongodbStore({
    uri: MONGO_URI,
    collection: 'sessions'
})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


//body parser  
app.use(bodyParser.urlencoded({ extended: false })) // string/array
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

//static file
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')))

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

//csurf attack + set isAuth cho mọi render view
app.use((req, res, next) => {
    res.locals.isAuth = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

//* Login 
// Kiểm tra session (isLoggedIn đồng thời user) 
// Nếu đã đăng nhập -> có isLoggedIn và req.session.user -> lưu user vào object req
app.use((req, res, next) => {

    if (!req.session.user) {  // Schema session = req.session
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

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// Error handling 404, 500
app.use(errorController.get404);

app.use((error, req, res, next) => {
    res.status(500).render('500');
})

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
        // console.log('Connected !')
        app.listen(5001)
    })
    .catch(err => console.log(err))