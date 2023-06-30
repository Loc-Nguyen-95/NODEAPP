# NODEAPP - Part4: Cookie & Session, Authentication, Email validation, File Up & Download

## Cookie & Session 

### 1. Cookie

Set thông qua response -> 🚀 gửi lại cho client 

Set header cho FE browser (set via Res header) -> store in the client-side

postLogin: (set cookie)
    res.setHeader('Set-Cookie', 'isLoggedIn=true')
    res.redirect('/')

-> route get view (lấy thông tin cookie ở header)
    const isLoggedIn = req.get('Cookie') 
    console.log(isLoggedIn) 
    ---
    result: isLoggedIn=true (string)

* Ngoài ra có thể set
    Expires=....
    Max-Age=....(second)
    Secure (https only)
    HttpOnly 

### 2. Session

1/ set store = MongodbStore({ //(connect-mongodb-session)(session)
    uri: '....',
    collection: 'sessions'
})

2/app.use(session({
    ....
    ....
    store: store
}))

3/ app.use(...if(req.session...)) //check nếu có session (check login)

-> session được lưu trong object request : req.session 

## II. Authentication 

1 - Gọi csurf, connect-flash 

......

2 - set isAuth và csrfToken vào locals (cho mọi render view)
    app.use .... 
    res.locals.isAuth = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();

3 - Kiểm tra thông tin login từ người dùng 
post login
    const email = req.body.email;
    const password = req.body.password;
    a - Tìm email 
    Use.findOne({email: email})
    .then(user => {
        if !user -> 
        req.flash('error', '....')
        redirect /login
        }
        b - So sánh password
        bcrypt 
            .compare(password, user.password)
            .then(doMatch => {
                if doMatch 
                    b.1 - nếu đúng password -> set isLoggedIn vào req.session
                    -> req.session.isLoggedIn = true
                        req.session.user = user
                    b.2 - save isLoggedIn và user vào session
                    return req.session.save(.... res.redirect(/))
                
                req.flash('error', '.....')
                res.redirect(/login)
            })
            .catch(err ....)
    )
    .catch(err ....)

===

1/ csurf : 
- Tạo token ở BE cho post request
    app.use(csrf())
    req.csrfToken()

- Kiểm tra ở FE input name="_csrf" 

2/ connect flash
- Tạo:
    app.use(flash())
    req.flash('name', 'message')

- Lấy: req.flash('name')

3**/ hash pass và bcrypt (AUTHENTICATE)
- Tạo hashpass ở form login 
    brypt.hass(password, 12).then( ...Lưu user với password mới)
- Compare hashpass
    bcrypt.compare(password, user.password).then( ...if do match(true) -> lưu session, return về home)

4/ Bảo vệ route (isAuth middleware)

export: (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login')
    }
}



---------

* Useful Resources & Links


