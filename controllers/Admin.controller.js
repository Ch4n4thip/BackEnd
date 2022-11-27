const mongoUtil = require('../config/database')
const { MongoClient } = require('mongodb')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken');

exports.getReport = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const query = req.query
    const newQuery = query.User
    const useQuery = newQuery?.replaceAll('"', ''); 
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
      try {
        // console.log(useQuery)
      await dbo
      .collection("Report")
        .find({ Head : "Report"})
        .project({
            _id: 0, 
            User:1,                     
            Target:1,
            TargetShop:1,
            Topic:1,
            Detail:1       
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

  exports.getReportComplete = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const query = req.query
    const newQuery = query.User
    const useQuery = newQuery?.replaceAll('"', ''); 
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
        // console.log(useQuery)
      await dbo
      .collection("ReportComplete")
        .find({ Status : "Banned"})
        .project({
            _id: 0,
            Head:1, 
            User:1,                     
            Target:1,
            TargetShop:1,
            Topic:1,
            Detail:1,
            Status:1       
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
  exports.ApproveReturn = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const { Email , proID , RecName  } = req.body
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
        // console.log(useQuery)
        if( Email !== undefined && proID !== undefined && RecName !== undefined)
        {  
           const updateAmount = { $set : { status : "Packing"}}
           dbo.collection("Report").findOneAndUpdate({ User : RecName , productID : proID , shopEmail : Email} , updateAmount ) 
   
           console.log("Change Complete")
           res.status(200).send("Success")
        }else{ res.status(400).send("Fail") }
      
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }

  };

  exports.DisapproveReturn = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const { Email , proID , RecName  } = req.body
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
        // console.log(useQuery)
        if( Email !== undefined && proID !== undefined && RecName !== undefined)
     {  
        const updateAmount = { $set : { status : "Disapprove"}}
        dbo.collection("Report").findOneAndUpdate({ User : RecName , productID : proID , shopEmail : Email} , updateAmount ) 

        console.log("Change Complete")
        res.status(200).send("Success")
     }else{ res.status(400).send("Fail") }
      
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }

  };

  exports.ApproveReport = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const { User , Target , TargetShop, Topic , Detail  } = req.body
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
        // console.log(useQuery)
        let myobj = {
            Head : "Report",
            User : User ,
            Target : Target ,
            TargetShop : TargetShop,
            Topic : Topic ,
            Detail : Detail,
            Status : "Banned",
          }
    
    
         if( User !== undefined)
         {  
    
            dbo.collection("ReportComplete").insertOne(myobj);
    
            const updateAmount = { $set : { Status : "Banned"}}
            dbo.collection("User").findOneAndUpdate({ email : User } , updateAmount ) 
            dbo.collection("Report").findOneAndDelete({ Head : "Report" , User:User , Target:Target , TargetShop:TargetShop, Topic:Topic , Detail:Detail  } , )
            console.log("Change Complete")
            res.status(200).send("Success")
         }else{ res.status(400).send("Fail") }
      
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }

  };

  exports.DisapproveReport = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const { User , Target , TargetShop, Topic , Detail  } = req.body
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
        // console.log(useQuery)
        dbo.collection("Report").findOneAndDelete({ Head : "Report" , User:User , Target:Target , TargetShop:TargetShop, Topic:Topic , Detail:Detail  } , )
        res.status(200).send("Success")
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }

  };

  exports.Unbanned = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const { Target  } = req.body
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
        // console.log(useQuery)
        if( Target !== undefined)
     {  

        const updateAmount = { $set : { Status : "Unbanned"}}
        dbo.collection("User").findOneAndUpdate({ email : Target } , updateAmount ) 
        dbo.collection("ReportComplete").findOneAndDelete({  Target:Target , Status:"Banned" } , )
        console.log("Change Complete")
        res.status(200).send("Success")
     }else{ res.status(400).send("Fail") }
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }

  };

  exports.getKYCCheck = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
      await dbo
      .collection("CheckKYC")
        .find({ Status : "Checking "})
        .project({
          _id: 0,                      
            Email:1,
            fullName:1,
            shopName:1,
            cardPCC:1,
            bankName:1,
            bookBank:1,
            phone:1,
            address:1,
            imgCard:1,
            ArrayaddDate:1,
            lastDate:1,           
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

  exports.addKYCCheck = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const { Email , Ans } = req.body
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
        let CheckM = await dbo.collection("CheckKYC").findOne( {Email : Email})
        const updateAmount = { $set : { role : "S" }}
      
        if(CheckM){console.log("Found") 
        
           dbo.collection("CheckKYC").findOneAndDelete({Email : Email})
           dbo.collection("User").findOneAndUpdate( {email :Email}  , updateAmount )
          console.log("Delete And Update Complete"); 
          res.status(200).send("success");
         }
         else   res.status(400).send("Not found"); 
        
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }

  };

  exports.KYCCheckDis = async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    const { Email , Dans } = req.body
    const dbo = client.db(process.env.DB_NAME);
    await client.connect();
   
 
    try {
        let CheckM = await dbo.collection("CheckKYC").findOne( {Email : Email})
     
      if(CheckM){console.log("Found") 
      
         dbo.collection("KYCSeller").findOneAndDelete({Email : Email})
         dbo.collection("CheckKYC").findOneAndDelete({Email : Email})
        console.log("Delete from KycCheck Complete"); 
        res.status(200).send("success");
       }
       else   res.status(400).send("Not found")
      } catch (err) {
        res.status(400).send({ message: "Error to get data", err });
      }

  };

  
  