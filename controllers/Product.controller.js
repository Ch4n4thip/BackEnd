const mongoUtil = require("../config/database");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
exports.getToCart = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  const getEmail = query.Email?.replaceAll('"', "");

  try {
    const getProduct = await dbo
      .collection("Product")
      .find({ Email: getEmail })
      .project({
        _id: 0,
        id: 1,
        Email: 1,
        shopName: 1,
        productName: 1,
        category: 1,
        price: 1,
        link: 1,
        imgProduct: 1,
        addDate: 1,
        lastUpdate: 1,
      })
      .toArray((err, result) => {
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });
        res.send(result);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};
exports.getCart = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  const newQuery = query.User;
  const useQuery = newQuery?.replaceAll('"', "");

  try {
    await dbo
      .collection("Cart")
      .find({ User: useQuery })
      .project({
        _id: 0,
        User: 1,
        productID: 1,
        amount: 1,
        DEmail: 1,
        DShopName: 1,
        DProductName: 1,
        DPrice: 1,
        DAmount: 1,
        DCategory: 1,
        DDetail: 1,
      })
      .toArray((err, result) => {
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });
        // console.log(getEmailModify);

        var sumPrice = 0;
        result.forEach((element) => {
          var all = element.DPrice * element.amount;
          sumPrice = sumPrice + all;
        });
        var sumPlusD = sumPrice + 40;

        res.send({ result, sumPrice, sumPlusD });

        console.log("Get Data Success");
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.addToCart = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { ProductId, Email, Amount, UserPro } = req.body;
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  const UserEmail = Email;

  let DEmail = UserPro[0].Email;
  let DShopName = UserPro[0].shopName;
  let DProductName = UserPro[0].productName;
  let DPrice = UserPro[0].price;
  let DAmount = UserPro[0].amount;
  let DCategory = UserPro[0].category;
  let DDetail = UserPro[0].detail;
  let idPro = UserPro[0].link;

  const IDproduct = idPro.split("-");

  const newProID = ProductId.split("-");

  const newEmail = Email.replaceAll('"', "");

  let Cart = await dbo
    .collection("Cart")
    .findOne({ User: newEmail, productID: newProID[1] });

  // console.log(" find id is   " ,  IDproduct[1]  )
  // console.log(" BOOLEAD RESULT IS  " ,  IDproduct[1]  )
  //  console.log(" email IS  " ,  Cart  )
  //  console.log(" productID IS " , Cart )
  // console.log("First " , Cart.productID)
  // console.log("Second " , newProID[1])
  // console.log("Check status " , Cart.productID === newProID[1])
  // console.log("Cart is " + Cart)
  // console.log(newEmailCheck === newEmail)

  const shopAmount = parseInt(DAmount);
  const cartAmount = parseInt(Amount);
  // console.log("Amount is " ,shopAmount)
  // console.log("CartAmount is " ,cartAmount)

  if (shopAmount >= cartAmount) {
    if (Cart) {
      console.log("In does Have UPDATE");
      const OldAmount = parseInt(Cart.amount);
      const NewAmount = parseInt(Amount);
      const newValue = OldAmount + NewAmount;
      const intNewValue = parseInt(newValue);

      const updateAmount = { $set: { amount: intNewValue } };

      const findCart = dbo
        .collection("Cart")
        .findOneAndUpdate(
          { User: Cart.User, productID: newProID[1] },
          updateAmount
        );
      console.log("IN UPDATE SECTION");

      const value = shopAmount - cartAmount;
      const newAmountValue = parseInt(value);
      const updateValue = { $set: { amount: newAmountValue } };
      const findProduct = dbo
        .collection("Product")
        .findOneAndUpdate(
          { Email: DEmail, productName: DProductName },
          updateValue
        );

      res.status(200).send({ message: "Add to cart" });
    } else {
      //  console.log('In does not  Have')
      const NewAmount = parseInt(Amount);
      const addCart = dbo.collection("Cart").insertOne({
        User: newEmail,
        productID: newProID[1],
        status: "Packing",
        amount: NewAmount,
        DEmail,
        DShopName,
        DProductName,
        DPrice,
        DAmount,
        DCategory,
        DDetail,
      });

      const value = shopAmount - cartAmount;
      const newAmountValue = parseInt(value);
      const updateValue = { $set: { amount: newAmountValue } };
      const product = dbo
        .collection("Product")
        .findOneAndUpdate(
          { Email: DEmail, productName: DProductName },
          updateValue
        );

      //   console.log("Created Data at User ADD");
      res.status(200).send({ message: "Add to cart" });
    }
  } else {
    res.status(400).send("Fail");
  }
};

exports.ReviewCal = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  const linkSplit = query.link;
  const split = linkSplit.split("-");
  console.log(split[1]);
  try {
    const review = await dbo
      .collection("Review")
      .find({ id: split[1] })
      .project({ _id: 0, id: 1, Star: 1, Amount: 1 })
      .toArray((err, result) => {
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });

        res.send(result);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.getComment = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  const linkSplit = query.link;
  const split = linkSplit?.split("-");

  try {
    const getComment = await dbo
      .collection("Comment")
      .find({ id: split[1] })
      .project({ _id: 0, id: 1, UserEmail: 1, Comment: 1, Star: 1 })
      .toArray((err, result) => {
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });

        res.send(result);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};
exports.getDetails = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  // console.log(query.link);
  try {
    const getDetail = await dbo
      .collection("Product")
      .find({ link: query.link })
      .toArray((err, result) => {
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });
        res.send(result);
        //   console.log(result);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};
exports.getReviewShop = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  try {
    await dbo
      .collection("Review")
      .find({ Email: query.Email })
      .project({ _id: 0, id: 1, Star: 1, Amount: 1 })
      .toArray((err, result) => {
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });

        res.send(result);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};
exports.addToCompare = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const { Email, Amount, UserPro, Star } = req.body;
  const dbo = client.db(process.env.DB_NAME);
  var editEmail = Email.replaceAll('"', "");
  try {
    const CheckM = await dbo
      .collection("Compare")
      .findOne({ email: editEmail });

    let DEmail = UserPro[0].Email;
    let DShopName = UserPro[0].shopName;
    let DProductName = UserPro[0].productName;
    let DPrice = UserPro[0].price;
    let DAmount = UserPro[0].amount;
    let DCategory = UserPro[0].category;
    let IMG = UserPro[0].imgProduct;
    let DDetail = UserPro[0].detail;
    let idPro = UserPro[0].link;
    if (CheckM.product1 === 0) {
      return null;
    }

    const updateAmount1 = {
      $set: {
        product1: {
          Img: IMG,
          productName: DProductName,
          price: DPrice,
          detail: DDetail,
          link: idPro,
          Star,
        },
      },
    };
    const updateAmount2 = {
      $set: {
        product2: {
          Img: IMG,
          productName: DProductName,
          price: DPrice,
          detail: DDetail,
          link: idPro,
          Star,
        },
      },
    };
    const updateAmount3 = {
      $set: {
        product3: {
          Img: IMG,
          productName: DProductName,
          price: DPrice,
          detail: DDetail,
          link: idPro,
          Star,
        },
      },
    };

    //var newValue = { $set: { name:name , birthdate : date , Tel : tel , gender : gender , img }};
    if (CheckM) {
      //dbo.collection("User").updateOne(CheckM,newValue )
      if (CheckM.product1 === null) {
        const findProductOne = await dbo
          .collection("Compare")
          .findOneAndUpdate({ email: editEmail }, updateAmount1);
        res.status(200).send({ message: "Changed Your info" });
      } else if (CheckM.product2 === null) {
        const findProductTwo = await dbo
          .collection("Compare")
          .findOneAndUpdate({ email: editEmail }, updateAmount2);
        res.status(200).send({ message: "Changed Your info" });
      } else if (CheckM.product3 === null) {
        const findProductThree = await dbo
          .collection("Compare")
          .findOneAndUpdate({ email: editEmail }, updateAmount3);
        res.status(200).send({ message: "Changed Your info" });
      } else {
        const findProduct = await dbo
          .collection("Compare")
          .findOneAndUpdate({ email: editEmail }, updateAmount3);
        res.status(200).send({ message: "Changed Your info" });
      }
    } else {
      return res.status(400).send({ message: "Don't have this email" });
    }
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

exports.useCoupon = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  const split = query.link.split("-");
  try {
    await dbo
      .collection("Coupon")
      .find({ Coupon: query.Coupon })
      // .project({
      //     _id: 0,
      //     email:0,
      //     shopName: 1,
      //     Discount: 1,
      //     Detail: 1,
      //     Coupon: 1,
      //     StartTime: 1,
      //     ExpireTime: 1,

      // })
      .toArray((err, result) => {
        var date = Date.now();
        var cou = [];
        for (var i = 0; i < result.length; i++) {
          var expire = new Date(result[i].ExpireTime);
          if (expire - date > 0) {
            cou.push(result[i]);
          }
        }
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });
        res.send(cou);
        console.log(cou);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.CouponAdmin = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const { Email, shopName, Discount, Detail, Start, Coupon, Expire } = req.body;
  const date = new Date(Expire);
  const result = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const dbo = client.db(process.env.DB_NAME);
  const query = req.query;
  try {
    var myobj = {
      email: req.body.Email,
      shopName: req.body.shopName,
      Discount: req.body.Discount,
      Detail: req.body.Detail,
      Coupon: req.body.Coupon,
      StartTime: req.body.Start,
      ExpireTime: req.body.Expire,
      ThaiDateExpireTime: result,
    };
    dbo.collection("Coupon").insertOne(myobj, function (err, result) {
      if (err) throw err;
      res.send({ message: "Insert Success" });
      console.log("Created Data");
    });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};
exports.getCouponAdmin = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);
  const Admin = "Admin";
  try {
    await dbo
      .collection("Coupon")
      .find({ shopName: Admin })
      .toArray((err, result) => {
        var date = Date.now();
        var cou = [];
        for (var i = 0; i < result.length; i++) {
          var expire = new Date(result[i].ExpireTime);
          if (expire - date > 0) {
            cou.push(result[i]);
          }
        }
        if (err)
          res.status(400).send({ message: "Cannot connect to database" });
        res.send(cou);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};
exports.addReview = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  var { id, UserEmail, productName, shopName, Star, CommentUser } = req.body;
  const Email = UserEmail.replaceAll('"', "");
  const dbo = client.db(process.env.DB_NAME);
  try {
    const CheckM = await dbo
      .collection("Review")
      .findOne({ id: req.body.id, Star: req.body.Star });
    if (CheckM === null) {
      dbo.collection("Review").insertOne(
        {
          id: id,
          productName: productName,
          shopName: shopName,
          Star: Star,
          Amount: 1,
        },
        function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        }
      );
    } else {
      if (Star === 5) {
        const updateAmount = {
          $set: {
            Star: Star,
            Amount: CheckM.Amount + 1,
          },
        };
        dbo.collection("Review").findOneAndUpdate({ Star: Star }, updateAmount);
      } else if (Star === 4) {
        const updateAmount = {
          $set: {
            Star: Star,
            Amount: CheckM.Amount + 1,
          },
        };
        dbo.collection("Review").findOneAndUpdate({ Star: Star }, updateAmount);
      } else if (Star === 3) {
        const updateAmount = {
          $set: {
            Star: Star,
            Amount: CheckM.Amount + 1,
          },
        };
        dbo.collection("Review").findOneAndUpdate({ Star: Star }, updateAmount);
      } else if (Star === 2) {
        const updateAmount = {
          $set: {
            Star: Star,
            Amount: CheckM.Amount + 1,
          },
        };
        dbo.collection("Review").findOneAndUpdate({ Star: Star }, updateAmount);
      } else if (Star === 1) {
        const updateAmount = {
          $set: {
            Star: Star,
            Amount: CheckM.Amount + 1,
          },
        };
        dbo.collection("Review").findOneAndUpdate({ Star: Star }, updateAmount);
      }
      dbo.collection("Comment").insertOne(
        {
          id: id,
          UserEmail: Email,
          productName: productName,
          shopName: shopName,
          Comment: CommentUser,
          Star: Star,
        },
        function (err, result) {
          if (err) throw err;
          res.send(result);
        }
      );
    }
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.addReturn = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();
  const {
    id,
    UserEmail,
    productName,
    newShopName,
    Reason,
    Amount,
    Price,
    shopEmail,
    productID,
    Address,
  } = req.body;
  const Email = UserEmail.replaceAll('"', "");
  const dbo = client.db(process.env.DB_NAME);

  let myobj = {
    Head: "Return",
    User: Email,
    shopName: req.body.newShopName,
    productID: req.body.productID,
    productName: req.body.productName,
    price: Price,
    amount: req.body.Amount,
    Reason: req.body.Reason,
    Address: req.body.Address,
    status: "Checking",
  };

  dbo.collection("Report").insertOne(myobj, function (err, result) {
    if (err) throw err;
   
  });
  dbo
    .collection("Complete")
    .findOneAndDelete({ User: UserEmail, productID: productID });

  res.status(200).send("OK");
};

exports.getHistory = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
  const query = req.query
  const newQuery = query.User
  const useQuery = newQuery?.replaceAll('"', ''); 
 

  try {
    // console.log(useQuery)
    await dbo
      .collection("History")
      .find({ User: useQuery })
      .project({
        _id: 0,
        status: 1,
        productID: 1,
        amount: 1,
        DShopName: 1,
        DProductName: 1,
        DPrice: 1,
        DCategory: 1,
        Address: 1,
        Method: 1,
      })
      .toArray((err, result) => {
        if (err) {
        
          res.status(400).send({ message: "Cannot connect to database" });
        }
        // console.log(getEmailModify);
        res.send(result);
        

      
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.getReturnHistory = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
  const query = req.query
  const newQuery = query.User
  const useQuery = newQuery?.replaceAll('"', ''); 
 

  try {
    console.log("GET!!!!")
  await dbo
  .collection("Report")
    .find({ Head : "Return" , User : useQuery})
    .project({
      _id: 0,                      
        Head:1,
        User:1,
        Address:1,
        shopName:1,
        shopEmail:1,
        productID:1,
        productName:1,
        price:1,
        amount:1,
        Reason:1,
        status:1,          
    })
    .toArray((err, result) => {
      if (err){
        console.log("Cant connect data")
        res.status(400).send({ message: "Cannot connect to database" });
        }
        // console.log(getEmailModify);
      res.send(result);
      console.log(result);
       
      
      console.log("Get Data Success");
    });
  
    
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.received = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { Email , proID , ShopName  } = req.body
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
 
  var editEmail = Email.replaceAll('"','' ) 

  try {
   
     if( Email !== undefined && proID !== undefined && ShopName !== undefined)
     {  
        let CheckM = await dbo.collection("History").findOne( {User : editEmail , productID : proID , DShopName : ShopName} ) 
        let myobj = {
            User: CheckM.User ,
            productID:CheckM.productID, 
            status :"Complete" , 
            amount : CheckM.amount , 
            DEmail : CheckM.DEmail , 
            DShopName : CheckM.DShopName , 
            DProductName : CheckM.DProductName , 
            DPrice : CheckM.DPrice ,
            DCategory : CheckM.DCategory,
            Address : CheckM.Address
        }
        dbo.collection("Complete").insertOne(myobj , function(err, res) {
            if (err) { throw err; }
            else {         
            console.log("Created Data at Complete");             
               }
            })
            dbo.collection("History").findOneAndDelete(
                { User : editEmail , productID : proID , DShopName : ShopName },
               
             )
            dbo.collection("Order").findOneAndDelete(
                { User : editEmail , productID : proID , DShopName : ShopName },
               
            )


        console.log("Change Complete")
        res.status(200).send("Success")
     }
    //  else{ 
    //     res.status(400).send("Fail") }
    
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.PackingReturnComplete = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { Email , proID , RecName  } = req.body
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
 
  var editEmail = Email.replaceAll('"','' ) 

  try {
   
    if( Email !== undefined && proID !== undefined && RecName !== undefined)
    {  
       const updateAmount = { $set : { status : "Delivering"}}
       dbo.collection("Report").findOneAndUpdate({ User : RecName , productID : proID , shopEmail : Email} , updateAmount ) 

       console.log("Change Complete")
       res.status(200).send("Success")
    }else{ res.status(400).send("Fail") }
    
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.getCompleteHistory = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { Email , proID , RecName  } = req.body
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
 
  const query = req.query
    const newQuery = query.User
    const useQuery = newQuery?.replaceAll('"', ''); 

  try {
   
    await dbo
          .collection("Complete")
            .find({ User : useQuery})
            .project({
                _id: 0, 
                User:1,                     
                status:1,
                productID:1,
                amount:1,
                DShopName:1,
                DProductName:1,
                DPrice:1,
                DCategory:1 ,
                Address:1,         
            })
            .toArray((err, result) => {
              if (err){
                console.log("Cant connect data")
                res.status(400).send({ message: "Cannot connect to database" });
                }
                // console.log(getEmailModify);
              res.send(result);
              console.log(result);
               
              
              console.log("Get Data Success");
            });
          
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.allProduct = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { Email , proID , RecName  } = req.body
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
 
  const query = req.query
    const newQuery = query.User
    const useQuery = newQuery?.replaceAll('"', ''); 

    try {
        
      await dbo
      .collection("Product")
        .find({})

        .toArray((err, result) => {
          if (err)
            res.status(400).send({ message: "Cannot connect to database" });
            // console.log(getEmailModify);
          res.send(result);
          // console.log(result);
          
          console.log("Get Data Success");
        });
      
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }
};
exports.Search = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const { searchText,category } = req.body;
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
 

    try {
        
      const a = await dbo
      .collection("Product")
      .find({ productName: { $regex: searchText.trim(),$options:'i' } })
      .toArray();

    res.send({ searchResult: a });
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }
};

exports.FilterPrice = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const query = req.query;
    const category = query.price;
    const DataCategory = category.split("-");
    const NewPrice = parseInt(DataCategory[1])
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
 

    try {
        
      await dbo
      .collection("Product")
        .find({  price: { "$gt": 0, '$lt': NewPrice } })
        
        .toArray((err, result) => {
          if (err)
            res.status(400).send({ message: "Cannot connect to database" });
            // console.log(getEmailModify);
          res.send(result);
        });
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }
};

exports.FilterProduct = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const query = req.query;
  const category = query.category;
  const DataCategory = category.split("-");
  const NewPrice = parseInt(DataCategory[1])
  const dbo = client.db(process.env.DB_NAME);
  await client.connect();
 

    try {
        
      await dbo
                  .collection("Product")
                    .find({ category: DataCategory[0] ,price: { "$gt": 0, '$lt': NewPrice } })
                    
                    .toArray((err, result) => {
                      if (err)
                        res.status(400).send({ message: "Cannot connect to database" });
                        // console.log(getEmailModify);
                      res.send(result);
                     
                    });
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }
};