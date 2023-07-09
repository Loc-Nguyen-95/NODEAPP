const User = require('../model/user');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null
    }
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        message: message,
        errorMessage: message,
        oldInput: {
            email: '',
            password: ''
        },
        validationEorrors: []
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    console.log('check error array', errors.array())

    if (!errors.isEmpty()) { // render lại trang với status 422 và biến lỗi
        return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            path: '/login',
            message: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        })
    }

    User.findOne({ email: email })
        .then(user => {
            
            if (!user) {
                // console.log('post login: k tìm thấy user')
                req.flash('error', 'Invalid email or password.')
                return res.redirect('/login')
            }
            // console.log('so sánh password ');
            // console.log(user)
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log('doMatch: ', doMatch)
                        // Lưu vào session 
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            // console.log('save session')
                            res.redirect('/')
                        })
                    }
                    req.flash('error', 'Invalid email or password.');
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login')
                })
        })
        .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}

//singup
exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Sign up',
        message: message,
        validationErrors: [],
        oldInput: []
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    console.log('test array error:', errors.array())
    if(!errors.isEmpty()){
        return res.status(422).render('auth/signup', {
            pageTitle: 'Signup',
            path: '/signup',
            message: errors.array()[0].msg, // hiển thị lỗi đầu tiên
            // * Truyền vào value input form 
            oldInput: {
                email: email,
                password: password,
                conformPassword: req.body.conformPassword
            },
            // * Truyền vào input class css
            validationErrors: errors.array() //Để bôi đỏ ô input bằng css
        })
    }

    // Chuyển tìm user trùng vào validator 

    // User.findOne({ email: email })
    //     .then(user => {
    //         if (user) {
    //             req.flash('error', 'Email exists already')
    //             return res.redirect('/signup');
    //         }

            bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save()
                })
                .then(result => {
                    res.redirect('/login')
                })

        // })

        .catch(err => console.log(err))
}