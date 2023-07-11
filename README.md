# NODEAPP - Part4 : :rocket: REST API (mô hình request - response với data JSON)

`REST:` Representation State - Transfer 

`API:` Application Programing - Interface

Bởi vì không phải tất cả các app đều sử dụng html code ví dụ Twitter (Mobile app): UI được cung cấp bởi apple

Người dùng không cần được cung cấp toàn bộ HTML code mà chỉ cần data ở BE

Send request với HTTP method thông qua async request (fetch)

`HTTP methods:`
GET,
POST,
PUT,
PATCH,
DELETE,
OPTION

`API endpoint:` HTTP methods + link

`REST princibles`
1. Thống nhất request và resonse
2. Stateless interaction (tương tác phi trạng thái): Không chia sẻ lịch sử chung, không sử dụng session, mỗi request là riêng lẽ và không liên quan đến request trước đó

---

Sử dụng bodyParser.json()

    RES.setHeader(
        1/ 'Access-Control-Allow-Origin' , '*'
        2/ 'Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'
        3/ 'Access-Control-Allow-Headers', 'Content-Type, Authorization'
    )

__Get:__ res.status(200).json({...})

__Post:__ res.status(201).json({...})


* Useful links and resources

    - Introduction to fetch():

      https://web.dev/introduction-to-fetch/

    - Ajax request:

      https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started
