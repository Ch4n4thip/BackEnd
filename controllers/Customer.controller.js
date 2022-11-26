const mongoUtil = require("../config/database");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
  
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
        console.log(result);
         
        
        console.log("Get Data Success");
      });
    
      
    } catch (err) {
      res.status(400).send({ message: "Error to get data", err });
    }

   
        
      
  };