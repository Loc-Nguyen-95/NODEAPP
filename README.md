# NODEAPP - Part3: Create a website with Express, Template Engine, MVC + Use NoSql Data MongoDB, Mongoose

## What is NoSql 

Làm việc với Database -> Collection -> Ducument (JSON)
    - NO data schema 
    - NO data relations (few connection, can realate document) 

### Relation in NoSql

Có thể duplicate data ( lồng toàn bộ data ), không chỉ ID như trong bảng của SQL 
-> Truy vấn nhanh chóng và hiệu quả hơn 

## Connect MongoDB

database.js
    call mongodb 
    call MongoClient 

    let _db 

    (1) mongoConnect = cb => {  //để connect với localhost

        MongoClient.connect(' CONNECTION STRING  ') 
            then client => 
                    _db = client.db() 
                    cb ()
        
            catch err => throw err 
    }

    (2) getDB = () =>   // Là 1 function return db (sau khi đã connect có được _db)
            if _db return _db 

    exports (1), (2)

* Note: in this Webapp use : [MongoDb Compass] - Loc / shop

## Model 
    Phương thức
        return db 
        .then( nhận 1 function ) // chú ý: kể cả không có gì cũng phải nằm trong 1 function 
        .catch (err => {...})

    -> Gọi phương thức : 
        methodName () 
            .then(data => { xử lí data đó  })
            .catch(err => console.log(err))


### Truy vấn data 
    1/ updateOne()
        db
        .collection('...')
        .updateOne({_id: ...}, {$set: ...}) //bắt buộc 2 trường !

    2/ find().toArray() //find all 

    3/ find({_id: {$in: ...}})

    4/ findOne({_id: ... })

    5/ insertOne()

    6/ deleteOne({_id: ... })

## Package Mongoose

ODM Library (Object Document Mapping)

- Khác với ORM trong Sql (Object Relation Mapping)

### Model (schema) 

call mongoose

Schema = mongoose.Schema

VD: 
    productSchema = new Schema({...})

    productSchema.methods.methodName = function(){...}

    exports: mongoose.model('Product', productSchema ) 


* Useful Resources & Links

    - MongoDB Official Docs: https://docs.mongodb.com/manual/core/security-encryption-at-rest/https://docs.mongodb.com/manual/

    - SQL vs NoSQL: https://academind.com/learn/web-dev/sql-vs-nosql/

    Package Mongoose 

    - Mongoosejs: https://mongoosejs.com/docs/