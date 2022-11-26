const mongoUtil = require("../config/database");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

exports.getProductClick = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);

  const query = req.query
    const useQuery = query.Email.replaceAll('"', ''); 
  console.log("Connected to database");
  

    try{  
        const getProduct = await dbo.collection('Product')
            .find({Email:useQuery})
            .project({
                _id: 0,
                id: 1,
                Email: 1,
                shopName: 1,
                productName: 1,
                category: 1,
                price: 1,
                link:1,
                imgProduct: 1,
                addDate: 1,
                lastUpdate: 1,
            }).toArray( (err, result) => {
                if(err) res.status(400).send({ message: 'Cannot connect to database'})
                res.send(result)
            })
            
    }catch(err){
        res.status(400).send({message: 'Error to get data', err})
    }
    
      
    
};
exports.addProductClick = async (req, res) => {
  console.log("Conected to database");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const {
    Email,
    productName,
    shopName,
    price,
    amount,
    category,
    detail,
    imgProduct,
    link,
  } = req.body;
  const EmailModify = Email?.replaceAll('"', "");
  console.log(EmailModify);
  const id = new ObjectId();
  const NameProduct = shopName + "-" + id;

  const dbo = client.db(process.env.DB_NAME);
  let myobj = {
    id: id,
    Email: EmailModify,
    shopName: shopName,
    productName: req.body.productName,
    price: req.body.price,
    amount: req.body.amount,
    category: req.body.category,
    detail: req.body.detail,
    imgProduct: req.body.img,
    link: NameProduct,
    addDate: new Date().toLocaleDateString("th-TH", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
  res.status(200).send("success");

  const addProduct = await dbo
    .collection("Product")
    .insertOne(myobj, function (err, result) {
      if (err) throw err;
     
    });
};
exports.getKycClick = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const query = req.query;
   const getEmailModify = query.Email?.replaceAll('"', "");
  const dbo = client.db(process.env.DB_NAME);

  try {
   const getKyc =  await dbo.collection("KYCSeller").find({ shopName: query.shopName })
      .toArray((err, result) => {
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });
        // console.log(getEmailModify);
        res.send(result);
        // console.log(result);

      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.addKycClick = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const  {Email, fullName , shopName, cardPCC, bankName, bookBank,phone,address,imgCard} = req.body
  const EmailModify = Email?.replaceAll('"', "");
  const dbo = client.db(process.env.DB_NAME);
let myobj =  { 
         Email: EmailModify,
         fullName: req.body.fullName , 
         shopName : req.body.shopName , 
         cardPCC : req.body.cardPCC , 
         bankName : req.body.bankName,
         bookBank: req.body.bookBank,
         phone: req.body.phone,
         address: req.body.address,
         imgCard: req.body.img,
         addDate: new Date().toLocaleDateString("th-TH", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          lastDate: new Date().toLocaleDateString("th-TH", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        } 
        let Check =  { 
            Email: EmailModify,
            fullName: req.body.fullName , 
            Status : "Checking ",
            shopName : req.body.shopName , 
            cardPCC : req.body.cardPCC , 
            bankName : req.body.bankName,
            bookBank: req.body.bookBank,
            phone: req.body.phone,
            address: req.body.address,
            imgCard: req.body.img,
            addDate: new Date().toLocaleDateString("th-TH", {
               weekday: "long",
               day: "numeric",
               month: "short",
               year: "numeric",
             }),
             lastDate: new Date().toLocaleDateString("th-TH", {
               weekday: "long",
               day: "numeric",
               month: "short",
               year: "numeric",
             }),
           } 
          res.status(200).send("success");
  
      const CheckKyc = await dbo.collection("CheckKYC").insertOne(Check, function(err, res) {
            if (err) throw err;
           console.log("Created Data"); 
         
      });
        
      const KycSeller = await dbo.collection("KYCSeller").insertOne(myobj, function(err, res) {
            if (err) throw err;
           console.log("Created Data"); 
         
      });
}
exports.getAllProduct = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const dbo = client.db(process.env.DB_NAME);
    try {
        
       const allProduct = await dbo.collection("Product").find({})

          .toArray((err, result) => {
            if (err)
              res.status(400).send({ message: "Cannot connect to database" });
              // console.log(getEmailModify);
            res.send(result);
            // console.log(result);
            
            
          });
        
          
        } catch (err) {
          res.status(400).send({ message: "Error to get data", err });
        }
}
exports.getUserSeller = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const query= req.query;
    const getEmailModify = query.Email?.replaceAll('"', "");
    const dbo = client.db(process.env.DB_NAME);
  
    try {
        const userSeller = await dbo
        .collection("KYCSeller")
          .find({Email :getEmailModify})
          .toArray((err, result) => {
            if (err)
              res.status(400).send({ message: "Cannot connect to database" });
              // console.log(query.Email);
              // console.log(getEmailModify);
            res.send(result);
            // console.log(result);
            
            console.log("Get Data Success");
          });
        } catch (err) {
          res.status(400).send({ message: "Error to get data", err });
        }
  };
  exports.addUserSeller = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    var { Email, img} = req.body;
    const query= req.query;
    const EmailModify = Email?.replaceAll('"', "");
    const dbo = client.db(process.env.DB_NAME);
  
    try {
        await dbo.collection("KYCSeller").findOneAndUpdate(
            { Email: EmailModify },
            {
              $set: {
                img: req.body.img,
                lastDate: new Date().toLocaleDateString("th-TH", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
              },
            },
            { returnNewDocument: true }
          ),
            (err, result) => {
              if (err) throw err;
              // console.log("result", result);
              res.send(result);
              console.log("1 document updated");
            };
        

        console.log(EmailModify);
        res.status(200).send("success");
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
        console.log(err);
      }
  };

  exports.getAllKyc = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const query= req.query;
    const getEmailModify = query.Email?.replaceAll('"', "");
    const dbo = client.db(process.env.DB_NAME);
  
    try {

       const allKyc = await dbo
        .collection("KYCSeller")
          .findOne({Email :getEmailModify}, function(err, result) {
          
            if (err)
              res.status(400).send({ message: "Cannot connect to database" });
              // console.log(getEmailModify);
            res.send(result);
            // console.log(result.shopName);
            
            console.log("Get Data Success");
          });
        
          
        } catch (err) {
          res.status(400).send({ message: "Error to get data", err });
        }
  };

  exports.updateSellerSetting = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const  {Email ,PaymentMethod , ShippingMethod   } = req.body
    const NewEmail = Email.replaceAll('"', "");
    const dbo = client.db(process.env.DB_NAME);
  
    try {
        await dbo.collection("KYCSeller").findOneAndUpdate(
            { Email: NewEmail},
            {
              $set: {
                PaymentMethod: req.body.PaymentMethod,
                ShippingMethod: req.body.ShippingMethod,
              },
            },
            { returnNewDocument: true }
          ),
            (err, result) => {
              if (err) throw err;
              // console.log("result", result);
              res.send(result);
              console.log("1 document updated");
            };
        

        res.status(200).send("success");
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
        console.log(err);
      }
  };
  exports.EditProduct = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    var { link, productName,price,detail} = req.body;
    const dbo = client.db(process.env.DB_NAME);
  
    await  dbo.collection("Product").findOneAndUpdate(
        { link: req.body.link },
        {
          $set: {
            productName: req.body.productName,
            price: req.body.price,
            detail: req.body.detail,
          },
        },
        { returnNewDocument: true },(err, result) => {
            if (err) throw err;
            // console.log("result", result);
            res.send(result);
            console.log("1 document updated");
            }
      )
  };
  exports.DeleteProduct = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    var { link} = req.body;

    const dbo = client.db(process.env.DB_NAME);
  
    const DeleteProduct = await dbo.collection("Product").findOneAndDelete(
           { link : req.body.link },(err, result) => {
            if (err) throw err;
            // console.log("result", result);  
            res.send(result);
            console.log("1 document Delete");
            }
          
        )
  };
  exports.getProductSeller = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const query= req.query;
    const { Email, productName,shopName, price, amount, category, detail, imgProduct,link } = req.body;
  
    const EmailModify = Email?.replaceAll('"', "");
    const ObjectId = require('mongodb').ObjectID
    const id = new ObjectId();
    const dbo = client.db(process.env.DB_NAME);
  
    try{  
       const getProductSeller =  await dbo.collection('Product')
            .find({shopName:query.shopName})
            .project({
                _id: 0,
                id: 1,
                Email: 1,
                shopName: 1,
                productName: 1,
                category: 1,
                price: 1,
                link:1,
                imgProduct: 1,
                addDate: 1,
                lastUpdate: 1,
            }).toArray( (err, result) => {
                if(err) res.status(400).send({ message: 'Cannot connect to database'})
                res.send(result)
            })
            
    }catch(err){
        res.status(400).send({message: 'Error to get data', err})
    }
  };

  exports.addProductSeller = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const { Email, productName,shopName, price, amount, category, detail, imgProduct,link } = req.body;
  
    const EmailModify = Email?.replaceAll('"', "");
    const ObjectId = require('mongodb').ObjectID
    const id = new ObjectId();
    const dbo = client.db(process.env.DB_NAME);
  
    let myobj = {
        id: id,
        Email: EmailModify,
        shopName: shopName,
        productName: req.body.productName,
        price: req.body.price,
        amount: req.body.amount,
        category: req.body.category,
        detail: req.body.detail,
        imgProduct: req.body.img,
        link: NameProduct,
        addDate:  new Date().toLocaleDateString("th-TH", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        
      };
      res.status(200).send("success");

      const addProductSeller = dbo.collection("Product").insertOne(myobj, function (err, result) {
        if (err) throw err;

      });
  };
  exports.ToReport = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const { Email ,Head , Detail , Target , TargetShop  } = req.body
    const dbo = client.db(process.env.DB_NAME);
    var editEmail = Email.replaceAll('"','' ) 
    let myobj = {
        Head:"Report",
        User:editEmail,
        Target:Target,
        TargetShop:TargetShop,
        Topic:Head,
        Detail:Detail

      }
      

     const Report = dbo.collection("Report").insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.status(200).send("success");
        
      });
  };

  exports.getCouponSeller = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const query= req.query;
    const dbo = client.db(process.env.DB_NAME);
    const coupon = await dbo.collection('Coupon')
                .find({shopName:query.shopName})
                .toArray( (err, result) => {
                  var date = Date.now();
                  var cou = [];
                  for(var i = 0; i < result.length; i++){
                    
                    var expire = new Date(result[i].ExpireTime);
                    if((expire - date) > 0){
                      cou.push(result[i]);
                      
                    }
                  }
                    if(err) res.status(400).send({ message: 'Cannot connect to database'})
                    res.send(cou)
                    // console.log(cou)
                })
  };
  exports.addCouponSeller = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const { Email, shopName, Discount, Detail, Start,Coupon,Expire} = req.body;
    const date = new Date(Expire);
    await client.connect();
    const dbo = client.db(process.env.DB_NAME);
    const result = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    var myobj =({
      
        email: req.body.Email,
        shopName: req.body.shopName,
        Discount: req.body.Discount,
        Detail: req.body.Detail,
        Coupon: req.body.Coupon,
        StartTime: req.body.Start,
        ExpireTime: req.body.Expire,
        ThaiDateExpireTime: result,
  });
  const addCoupon = dbo.collection("Coupon").insertOne(myobj, function (err, result) {
    if (err) throw err;

  });
  };
  
  