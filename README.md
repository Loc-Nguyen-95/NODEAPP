# NODEAPP - :herb: Part4: Cookie & Session, Authentication, Email validation, Error Handling, File Up & Download

## I. Cookie & Session 

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

=== 
res.setHeader('Set-Cookie', '...')
req.get('Cookie')

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

=========
Session không tạo model giống như các schema khác 
Được tạo thông qua middleeware app.use(session(...store: store))
    store = MongodbStore({
        uri
        collection
    })

## II. Authentication: xác thực (sử dụng session) 

1 - (app.js) Kiểm tra trong session có user và isLoggedIn chưa -> lưu user vào request

    middleware: app.use ... 
        if !req.session.user 
            -> next() ??
        else 
        User.findById(req.session.user._id)
            if user req.user = user 
            -> next() 

2 - set isLoggegIn locals (cho mọi render view)
        req.locals.isAuth = req.session.isLoggedIn

3 - Kiểm tra email, password người dùng -> ghi vào session 

    const email = req.body.email;
    const password = req.body.password;

    a - Tìm user thông qua email 
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

===
Kiểm tra thông tin Email loggin xem có đúng với thông tin lưu trong DB không

post login
+ Thông tin nhập vào: req.body.email
+ Thông tin email của user trong mongodb: User.findOne({email: req.body.email})
    + Nếu not user -> return redirect về /login
    + Kiểm tra bằng `bcrypt.compare()`

app.js: chủ yếu là lưu user đã kiểm tra thông qua tìm User.findById() -> sau đó lưu vào req.user
middleware kiểm tra req.session.user 
    1. Có req.session.user không 
    2. model User.findById({req.session.user._id})

## III. Email & validate 

### Email
Với Nodejs ta không thể tạo 1 server gửi mail (gửi mail lại cho FE) dễ dàng ( handling mail khác với handling request )
-> Third party mail-server -> SendGrid

Tương tác với sendgrid -> NODEJS: install nodemailer, nodemailer-sendgrid-transport

setup: 
nodemailer = require('nodemailer');
transport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(
    transport({
        auth: {
            api_key: 
        }
    })
)

-> transporter.sendMail({
    to: email, (email login, email của user)
    from: "shop@node-complete.com", (Nodejs server)
    subject: 'Signup successful',
    html: '<h1>Sign up successful</h1>'
})

===
Xử lí email (mail server) và xử lí request (node server)
chủ yếu là gửi lại mail cho user từ nodejs 

if find one use 
.then(result => 
    return transporter.sendMail({
        to: ...,
        from: ...,
        ...
    })

### Validate

- Có thể validate ở FE nhưng người dùng có thể thay đổi code ở FE 
-> Validate ở BE là bắt buộc.

- Kiểm tra email nhập vào từ người dùng.

- Phản hồi lại cho người dùng 

* Input 
    Những route post có body nhận value từ body form

* Output 
    Gửi lại thông báo cho  người dùng (thông qua biến lỗi validationResult )

Setup
    express-validator

1/ Ở route

    const {check/ body} = require('express-validator/check') // check for the body (form input)
    VD: router.post('/...path',

        check/body('email') 
        (1).isEmail() //Nếu có lỗi sẽ truyền vào withMessage
        .withMessage('...')
        (2).nornalizeEmail(),

        body('password', 'password have to be valid' ) // check for body input name + message
        .isAlphanumberic()
        .trim()

        controller...)
    
    custom validate
        custom( nhận value, req ) {
            VD so sánh:
            if value !== req.body. ...
                throw new Error('...') /
                return Promise.reject('...')
        }
    async validate
        custom(
            `value, req => {
            User.findOne({email: email})
            .then( user => 
                if  user
                    return Promise.reject('...')
            )
        }` là 1 function
        Hoặc có thể viết
        async  (value, req) => 
            const user = await User.findOne(....)
            if(user) { throw Error('...') }
        )

2/ Ở controller

    controller nhận biến lỗi và truyền vào view 
    const { validationResult } = require('express-validator/check')
    const errors = validationResult(req);

    res.render('...', {
        message: errors.array()[0]
    })
## IV. ERROR HANDLING 

1/ Ở app.js

Tạo trang lỗi 500.ejs 

Tạo middleware có biết lỗi (error, req, res, next) //bắt next(error)
    res.render('500')
2/ Ở controller trong mọi then...catch (async code)
    catch(err) {
        return next( new Error(err) ) /
        return next(err) /
        return next(new Error('....'))
    }

`Chú ý:` 
Bên ngoài async code có thể throw error và gọi trực tiếp cho middleware xử lí
Bên trong async code phải đặt trong promise then... catch(err => next(new Error(err )))

## V. File download & upload 

1. Upload

set input type = 'file', form enctype='multipart/formdata'

set multer = require('multer')
    app.use(multer(STORAGE, FILEFILTER).single('INPUT NAME'))

read multer file in controller:
    req.file

Ghi file ( Ghi static image url )
    req.file.path -> lưu path vào mongodb : images/..... .png

Đọc file 
    app.use('/images', express.static( path.join (DIRNAME, 'FOLDER' ) )
    Chú ý: '/images' để đọc req.file.path: '/images/....'
View hiển thị file 

    image: "/<% imageUrl (file path)%>"

Note: Xoá file khi update immage (Chọn file mới)

    fs.unlink 
        function deleteFile = (path) => {
            fs.unlink(path, err => {
                if(err){ throw err }
            })
        }

===
multer: Có thể đọc được nhiều dạng input type 

2. Download invoice

- Button download với link dẫn tới route GET: .../order/<%= order._id %>

- Shop Route: .../order/:oderId

- Shop controller:
    oderId = req.prarams....
    Oder.findById(orderId)

        if not order -> next()
        if order.user.userId !== req.user._id 

        invoice name 

        invoice path 

        ** pdfDoc

        a. set header 
            + Content-Type
            + Content-Disposition

        b. pipe
            + fs.createWriteScream(invoice path) !! coi lại
            + RES
        c. make up file pdf 
        VD
            .text(INVOICE)
            .text(-----)
            .text(Title - Quantity, Price ...)

        d. end



---------

* Useful Resources & Links 

- bcrypt
https://www.npmjs.com/package/bcrypt
https://github.com/dcodeIO/bcrypt.js

- csrf
https://www.acunetix.com/websitesecurity/csrf-attacks/

----

- Nodemailer Official Docs
https://nodemailer.com/about/

- SendGrid Official Docs
https://sendgrid.com/docs/

- validate 
Express-Validator Docs:
https://express-validator.github.io/docs/

- Validator.js (which is used behind the scenes) Docs:
https://github.com/chriso/validator.js
