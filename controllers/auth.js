exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuth: false
    })
}

exports.postLogin = (req, res, next) => {
    
}