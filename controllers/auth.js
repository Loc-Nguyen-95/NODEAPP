const User = require('../model/user');
const bcrypt = require('bcryptjs');

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
        message: message
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            console.log('post login: k tìm thấy user')
            req.flash('error', 'Invalid email or password.')
            return res.redirect('/login')
        }
        // console.log('so sánh password ');
        // console.log(user)
        bcrypt
        .compare(password, user.password)
        .then(doMatch => {
            if(doMatch){
                console.log('doMatch: ', doMatch)
                // Lưu vào session 
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    console.log('save session')
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
    if(message.length > 0){
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Sign up',
        message: message
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(user){
            req.flash('error', 'Email exists already')
            return res.redirect('/signup');
        }
        bcrypt 
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: {items: []}
            });
            return user.save()
        })
        .then(result => {
            res.redirect('/login')
        })
    })
    .catch(err => console.log(err))
}