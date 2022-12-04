const mongoUtil = require("../config/database");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

exports.addProductClick = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      size,
      type,
      detail,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
      size: req.body.size,
      type: req.body.type,
      detail: req.body.detail,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
      });
      res.status(200).send("success");
  };
exports.addCamera = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      Lens,
      Change_Lens,
      detail,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
      Lens: req.body.Lens,
      Change_Lens: req.body.Change_Lens,
      detail: req.body.detail,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
       console.log(err);
      });
      res.status(200).send("success");
  };
  exports.addSport = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      Type,
      detail,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
      Type: req.body.Type,
      detail: req.body.detail,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
      });
      res.status(200).send("success");
  };
  exports.addToys = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      rate,
      detail,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
      rate: req.body.rate,
      detail: req.body.detail,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
      });
      res.status(200).send("success");
  };

  exports.addBeautyPetStationery = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      detail,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
      detail: req.body.detail,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
      });
      res.status(200).send("success");
  };

  exports.addComputer = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      Processor,
      Chipset,
      Graphic,
      Display_Screen,
      Main_Memory,
      Storage,
      OS,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
       Processor: req.body. Processor,
      Chipset: req.body.Chipset,
      Graphic: req.body.Graphic,
      Display_Screen: req.body.Display_Screen,
      Main_Memory: req.body.Main_Memory,
      Storage: req.body.Storage,
      OS: req.body.OS,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
      });
      res.status(200).send("success");
  };

  exports.addGame = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      Years,
      Type,
      Age,
      detail,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
      Years: req.body.Years,
      Type: req.body.Type,
      Age: req.body.Age,
      detail: req.body.detail,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
      });
      res.status(200).send("success");
  };

  exports.addController = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      Years,
      Portable,
      Connect_Port,
      detail,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
      Years: req.body.Years,
      Portable: req.body.Portable,
      Connect_Port: req.body.Connect_Port,
      detail: req.body.detail,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
      });
      res.status(200).send("success");
  };

  exports.addClothes = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      size,
      Material,
      gender,
      detail,
      category,
      imgProduct,
  
    } = req.body;
    const EmailModify = Email?.replaceAll('"', "");
   
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
      brand: req.body.brand,
      size: req.body.size,
      Material: req.body.Material,
      gender: req.body.gender,
      detail: req.body.detail,
      category: req.body.category,
      imgProduct: req.body.imgProduct,
      link: NameProduct,
      addDate: new Date().toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
   
  
    const addProduct = await dbo
      .collection("Product")
      .insertOne(myobj, function (err, result) {
        if (err) throw err;
       console.log(result);
      });
      res.status(200).send("success");
  };