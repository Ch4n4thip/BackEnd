const mongoUtil = require("../config/database");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
//ttt
exports.addBagClick = async (req, res) => {

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
      washAble,
      capacity ,
      material ,
      weight ,
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
      Type: req.body.type,
      washAble : req.body.washAble,
      capacity : req.body.capacity,
      material : req.body.material,
      weight : req.body.weight,
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
  exports.addWatchClick = async (req, res) => {

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
      avalible,
      water,
      material,
      display,
      platform,
      call,
      noti,
      fitness,
      Battery_Life,
      music,
      security,
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
      avalible: req.body.avalible,
      water: req.body.water,
      material: req.body.material,
      display: req.body.display,
      platform: req.body.platform,
      call: req.body.call,
      noti: req.body.noti,
      fitness: req.body.fitness,
      Battery_Life: req.body.Battery_Life,
      music: req.body.music,
      security: req.body.security,
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
  exports.addShoesClick = async (req, res) => {

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
      material,
      fromCountry,
      wash,
      serface,
      rope,
      sport,
      slip,
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
      Type: req.body.type,
      fromCountry : req.body.fromCountry,
      wash : req.body.wash,
      material : req.body.material,
      serface : req.body.serface,
      rope : req.body.rope,
      sport : req.body.sport,
      slip : req.body.slip,
      detail: req.body.detail,
      category: req.body.category,
      material : req.body.material,
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
      effPix ,
      senPix ,
      maxRes ,
      minRes ,
      imgRatio ,
      sensor ,
      manual ,
      dust ,
      stable ,
      face ,
      opZoom ,
      dgZoom ,
      aRange ,
      speed ,
      iso ,
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
      effPix : req.body.effPix ,
      senPix : req.body.senPix ,
      maxRes : req.body.maxRes ,
      minRes : req.body.minRes ,
      imgRatio : req.body.imgRatio ,
      sensor : req.body.sensor ,
      manual : req.body.manual ,
      dust : req.body.dust ,
      stable : req.body.stable ,
      face : req.body.face ,
      opZoom : req.body.opZoom ,
      dgZoom : req.body.dgZoom ,
      aRange : req.body.aRange ,
      speed : req.body.speed ,
      iso : req.body.iso ,
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
      type,
      material ,
      surface ,
      player ,
      circum ,
      weight ,
      special ,
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
      type: req.body.type,
      material : req.body.material ,
      surface : req.body.surface ,
      player : req.body.player ,
      circum : req.body.circum ,
      weight : req.body.weight ,
      special : req.body.special ,
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
      place ,
      fragile ,
      height ,
      weight ,
      special ,
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
      place : req.body.place ,
      fragile : req.body.fragile ,
      height : req.body.height ,
      weight : req.body.weight ,
      special : req.body.special ,
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

  exports.addBeauty = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      fromCountry ,
      material ,
      notUser ,
      netAmount ,
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
      fromCountry : req.body.fromCountry ,
      material : req.body.material ,
      notUser : req.body.notUser ,
      netAmount : req.body.netAmount ,
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

  exports.addPet = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      nAmount ,
      animal ,
      stateFood,
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
      nAmount: req.body.nAmount,
      animal: req.body.animal,
      stateFood: req.body.stateFood,
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

  exports.addStationery = async (req, res) => {

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const {
      Email,
      shopName,
      productName,
      price,
      amount,
      brand,
      material ,
      weight ,
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
      material : req.body.material ,
      weight: req.body.weight,
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
      type,
      online,
      player,
      hour,
      platform,
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
      Type: req.body.type,
      Age: req.body.Age,
      online: req.body.online,
      player: req.body.player,
      hour: req.body.hour,
      platform: req.body.platform,
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
      platform,
      wire,
      weight,
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
      platform: req.body.platform,
      wire: req.body.wire,
      weight: req.body.weight,
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
      hood,
      pocket,
      sleeve,
      free,
      sport,
      water,
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
      hood: req.body.hood,
      pocket: req.body.pocket,
      sleeve: req.body.sleeve,
      free: req.body.free,
      sport: req.body.sport,
      water: req.body.water,
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