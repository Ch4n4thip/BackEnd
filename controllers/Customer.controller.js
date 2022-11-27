const mongoUtil = require("../config/database");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const jwt = require('jsonwebtoken');

exports.ToHistory = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    var {Email,Address,Method} = req.body;
   
    const dbo = client.db(process.env.DB_NAME);
    
    var editEmail = Email.replaceAll('"','' )
       
      var CheckM = await dbo.collection("Cart").find( { User : editEmail } , {projection : {
        _id: 0,
        User: 1, 
        productID:1,                   
        amount:1,
        DEmail:1,                 
        DShopName:1,
        DProductName:1,
        DPrice:1,   
        DCategory:1,
        status:1,
        Address:Address,
        Method:Method,
      } } ).toArray()
    
  
      // console.log( CheckM)

      //var newValue = { $set: { name:name , birthdate : date , Tel : tel , gender : gender , img }};
     
      if (CheckM) {
        //This section is for ADD to history
        dbo.collection("History").insertMany(CheckM, function(err, result) {
          if (err) { throw err; }
          else {         
          console.log("HISTORY : ADD to history complete"); 
          //          
             }
              
          });
        //This section is for ADD to Order

        dbo.collection("Order").insertMany(CheckM, function(err, res) {
          if (err) { throw err; }
          else {         
          console.log("HISTORY : ADD to history complete");             
             }
          });

        //This section is for Decrease Amount in Product

        //This section is for DELETE from cart
        dbo.collection("Cart").deleteMany( {User : editEmail} , function(err, res){
          if(err){ throw err;}
          else{
            console.log("HISTORY : delete from cart complete")
          }
        })
      
        //This section is for Response 
            console.log("Found it")
            
            res.status(200).send({message: "Changed Your info"})    
      }else { 
        console.log("Cant Found")
        return res.status(400).send({message: "Don't have this email"}) 
      
    
     
    }
        
      
  };

  exports.Payment = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const { Email, amount, token,Address,Method  } = req.body;
   
    const dbo = client.db(process.env.DB_NAME);
    
    var editEmail = Email.replaceAll('"','' )
  // var omise = require("omise")({
  //   publicKey: "pkey_test_5sll7jlzxzo33kidzpm",
  //   secretKey: "skey_test_5slmiglcb71gkd9swo4",
  // });
  var request = require("request");

  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  var dataString = "amount=" + amount + "&currency=thb&card=" + token;

  var options = {
    url: "https://api.omise.co/charges",
    method: "POST",
    headers: headers,
    body: dataString,
    auth: {
      'user': process.env.OMISE_SKEY,
      'pass': '',
    },
  };

  async function callback(error, response, body) {
    const omiseCharge = JSON.parse(body)
    if (!error && response.statusCode == 200) {
      let CheckM =  await dbo.collection("Cart").find( { User : editEmail } , {projection : {
        _id: 0,
        User: 1, 
        productID:1,                   
        amount:1,
        DEmail:1,                 
        DShopName:1,
        DProductName:1,
        DPrice:1,   
        DCategory:1,
        status:1,
        Address:Address,
        Method:Method,
        statusPayment:omiseCharge.status,
      } } ).toArray()
     console.log(omiseCharge)
     console.log(omiseCharge.status)
     if (CheckM) {
      //This section is for ADD to history
      dbo.collection("History").insertMany(CheckM, function(err, result) {
        if (err) { throw err; }
        else {         
        console.log("HISTORY : ADD to history complete"); 
        //          
           }
            
        });
      //This section is for ADD to Order

      dbo.collection("Order").insertMany(CheckM, function(err, res) {
        if (err) { throw err; }
        else {         
        console.log("HISTORY : ADD to history complete");             
           }
        });

      //This section is for Decrease Amount in Product

      //This section is for DELETE from cart
      dbo.collection("Cart").deleteMany( {User : editEmail} , function(err, res){
        if(err){ throw err;}
        else{
          console.log("HISTORY : delete from cart complete")
        }
      })
    
      //This section is for Response 
          console.log("Found it")
          
          res.status(200).send({message: "Changed Your info"})    
    }else { 
      console.log("Cant Found")
      return res.status(400).send({message: "Don't have this email"}) 
    
  
   
  }
  }
  }

  request(options, callback);
  res.send("OK");
        
      
  };

  exports.Method = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const query = req.query;
    console.log(query.Email)
  const newQuery = query.Email;
  const useQuery = newQuery?.replaceAll('"', "");
    const dbo = client.db(process.env.DB_NAME);
    const Method = await dbo.collection('KYCSeller')
                  .findOne({Email: useQuery})
                  res.send({Method:Method.PaymentMethod})
                  console.log(Method)
   
        
      
  };
  exports.delCompare = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const { Email } = req.body
   
    const dbo = client.db(process.env.DB_NAME);

  var editEmail = Email.replaceAll('"','' ) 
      var CheckM = await dbo.collection("Compare").findOne( { email : editEmail} )
    
      const updateAmount = { $set : { product1 : null , product2 : null , product3 : null}}

      //var newValue = { $set: { name:name , birthdate : date , Tel : tel , gender : gender , img }};
      if (CheckM) {
            dbo.collection("Compare").findOneAndUpdate( {email : editEmail}  , updateAmount ) 
            res.status(200).send({message: "Changed Your info"})    
      }else { 
        return res.status(400).send({message: "Don't have this email"}) 
      }
   
        
      
  };

  exports.getCompare = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const query = req.query
    const newQuery = query.User
    const useQuery = newQuery?.replaceAll('"', ''); 
   
    const dbo = client.db(process.env.DB_NAME);

    try {
      // console.log(useQuery)
    await dbo
    .collection("Compare")
      .find({ email : useQuery})
      .project({
          _id: 0,                      
          product1:1,
          product2:1,
          product3:1,        
      })
      .toArray((err, result) => {
        if (err){
          console.log("Cant connect data")
          res.status(400).send({ message: "Cannot connect to database" });
          }
          // console.log(getEmailModify);
        res.send(result);
      
         
        
        console.log("Get Data Success");
      });
    
      
    } catch (err) {
      res.status(400).send({ message: "Error to get data", err });
    }

   
        
      
  };

  exports.login = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const { email, password } = req.body
    const dbo = client.db(process.env.DB_NAME);

    try {
      // console.log(useQuery)
      var CheckM = await dbo.collection("User").findOne({ email })
   
        const payload = {
        user: {
          email: CheckM.email,
          name: CheckM.name,
          role: CheckM.role,
          tel: CheckM.Tel,
          birthdate: CheckM.birthdate ,
          gender: CheckM.gender,
          address: CheckM.Address
        }
      }
  
    //console.log(CheckM)
    //console.log(password)
      if (CheckM) {
        if(CheckM.Status === "Banned"){ res.status(400).json("Banned")}
        
        if (CheckM.password == password) {
          //res.status(200).send({message: "Success"})
  
          jwt.sign(
            payload , "logmail" , { expiresIn : 3600 } , ( err, token) => {
              if(err) { throw err ; }
               res.status(200).json({token,payload})
            }
  
          )
        //  console.log(payload)
          
        }
        else { res.status(400).send({message: "Email or password incorrect"}) }
      }else { 
        return res.status(400).send({message: "Don't have this email"}) 
      }
      
    } catch (err) {
      res.status(400).send({ message: "Error to get data", err });
    }

   
        
      
  };

  exports.getOrder = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const query = req.query
    const newQuery = query.User
    const useQuery = newQuery?.replaceAll('"', ''); 
   
    const dbo = client.db(process.env.DB_NAME);

    try {
      // console.log(useQuery)
      await dbo
      .collection("Order")
        .find({ DEmail : useQuery})
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
            Method:1,         
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

  exports.getCompleteOrder = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const query = req.query
    const newQuery = query.User
    const useQuery = newQuery?.replaceAll('"', ''); 
   
    const dbo = client.db(process.env.DB_NAME);

    try {
      // console.log(useQuery)
      await dbo
          .collection("Complete")
            .find({ DEmail : useQuery})
            .project({
                _id: 0,                      
                status:1,
                productID:1,
                amount:1,
                DEmail:1,
                DShopName:1,
                DProductName:1,
                DPrice:1,
                DCategory:1,
                Address:1,          
            })
            .toArray((err, result) => {
              if (err){
                console.log("Cant connect data")
                res.status(400).send({ message: "Cannot connect to database" });
                }
                // console.log(getEmailModify);
              res.send(result);
              // console.log(result);
               
              
              console.log("Get Data Success");
            });
      
    } catch (err) {
      res.status(400).send({ message: "Error to get data", err });
    }

   
        
      
  };

  exports.getReturnOrder = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const query = req.query
    const newQuery = query.User
    const useQuery = newQuery?.replaceAll('"', ''); 
   
    const dbo = client.db(process.env.DB_NAME);

    try {
      // console.log(useQuery)
      await dbo
          .collection("Report")
            .find({ Head : "Return" , shopEmail : useQuery})
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
              // console.log(result);
               
              
              console.log("Get Data Success");
            });
      
    } catch (err) {
      res.status(400).send({ message: "Error to get data", err });
    }

   
        
      
  };

  exports.PackingComplete = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const { Email , proID , RecName   } = req.body
   
    const dbo = client.db(process.env.DB_NAME);
 console.log("edit is",RecName)
      console.log("proid is " ,proID)
      console.log("Email is " ,Email)
      console.log("Packing" )
    if( Email !== undefined && proID !== undefined && RecName !== undefined)
     {  
        const updateAmount = { $set : { status : "Delivering"}}
        dbo.collection("Order").findOneAndUpdate({ User : RecName , productID : proID , DShopName : Email} , updateAmount ) 
        dbo.collection("History").findOneAndUpdate({ User : RecName , productID : proID , DShopName : Email } , updateAmount ) 

        console.log("Change Complete")
        res.status(200).send("Success")
     }else{ res.status(400).send("Fail") }
      

   
        
      
  };

  exports.addUser = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const { email , name, date , tel , gender , img } = req.body
    const editEmail = email?.replaceAll('"','' ) 
    const dbo = client.db(process.env.DB_NAME);
    var CheckM = await dbo.collection("User").findOne( { email : editEmail} ) 
          
    // console.log(Email)
    // console.log(CheckM)
    var newValue = { $set: { name:name , birthdate : date , Tel : tel , gender : gender , img }};
    if (CheckM) {
          dbo.collection("User").updateOne(CheckM,newValue )
          res.status(200).send({message: "Changed Your info"})   
    }else { 
      return res.status(400).send({message: "Don't have this email"}) 
    }

  };

  exports.getUser = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const { Email , proID , RecName   } = req.body
    const query= req.query;
    const getEmailModify = query.Email?.replaceAll('"', "");
    const dbo = client.db(process.env.DB_NAME);
    try {

      await dbo
      .collection("User")
        .find({email :getEmailModify})
        .toArray((err, result) => {
          if (err)
            res.status(400).send({ message: "Cannot connect to database" });
            console.log(query.Email);
            console.log(getEmailModify);
          res.send(result);
          // console.log(result);
          
          console.log("Get Data Success");
        });
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }
      

  };

  exports.addAddress = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const  { Address, email } = req.body
  const getEmailModify = email?.replaceAll('"', "");
    const dbo = client.db(process.env.DB_NAME);
    try {

      var CheckM = await dbo.collection("User").findOne({ email : getEmailModify }) 
      var newValue = { $set: { Address : Address }};
      if (CheckM) {
        dbo.collection("User").updateOne(CheckM,newValue )
        res.status(200).send({message: "Add your new address"})   
  } else { 
    return res.status(400).send({message: "Something Wrong"}) 
  }
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }
      

  };

  exports.Register = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const  { email , password , name , birth_date } = req.body
    const dbo = client.db(process.env.DB_NAME);
    try {

      let myobj =  { email: req.body.email , name : req.body.name , password : req.body.password , birthdate : req.body.birth_date , role : "M" , gender : "none" , 
                     Tel : "none" , Address : "none" , Status:"Unbanned"}  
      let emailForCart = { email : req.body.email }
      let emailForCompare = { email : req.body.email , product1: null , product2: null , product3: null }

      let CheckM = await dbo.collection("User").findOne( {email} ) 
      if(CheckM){ 
       // console.log("have it") }
          console.log("Have M")
          res.status(400).send({message: "Already Have This Email"});
        }
      else {
       dbo.collection("User").insertOne(myobj, function(err, res) {
          if (err) { throw err; }
          else {         
          console.log("Created Data at User");             
             }
          });
          dbo.collection("Cart").insertOne(emailForCart, function(err, res) {
            if (err) { throw err; }
            else {         
            console.log("Created Data at User");             
               }
            });
      dbo.collection("Compare").insertOne( emailForCompare, function(err, res) {
         if (err) { throw err; }
         else {         
         console.log("Created Data at Compare");             
             }
         });
        
         
          return res.status(200).send({message: "Data Created"})
        
          }  
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }
      

  };

  exports.Remember = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const  { Email , password   } = req.body
    const dbo = client.db(process.env.DB_NAME);
    try {
      await  dbo.collection("User").findOneAndUpdate(
          { email: Email},
          {
            $set: {
              password: password,
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