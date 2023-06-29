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

---------

* Useful Resources & Links


