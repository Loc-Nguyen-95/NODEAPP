const User = require('../model/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie')
    // .trim()
    // .split('=')[1]
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuth: false
    }) 
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    // res.redirect('/')
    User.findById('644e3ba2bb7c9a62ae805995') // luôn có 
    .then(user => {
        // console.log('req.session: ', req.session)
        req.session.isLoggedIn = true;
        req.session.user = user;

        req.session.save(err => {
            console.log(err);
            res.redirect('/')
        })
    })
}

exports.postLogout = (req, res , next) => {
    req.session.destroy(err => {
        console.log.og(err);
        res.redirect('/');
    })
}