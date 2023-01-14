const mongoUtil = require("../config/database");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

exports.CameraToCompare = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const { Email, Amount, UserPro, Star } = req.body;
  const dbo = client.db(process.env.DB_NAME);
  var editEmail = Email.replaceAll('"', "");

  // try {
  const CheckM = await dbo.collection("Compare").findOne({ email: editEmail });

  let DEmail = UserPro[0].Email;
  let DShopName = UserPro[0].shopName;
  let DProductName = UserPro[0].productName;
  let DPrice = UserPro[0].price;
  let DAmount = UserPro[0].amount;
  let brand = UserPro[0].brand;
  let Lens = UserPro[0].Lens;
  let size = UserPro[0].size;
  let Type = UserPro[0].Type;
  let rate = UserPro[0].rate;
  let Years = UserPro[0].Years;
  let Age = UserPro[0].Age;
  let Portable = UserPro[0].Portable;
  let Connect_Port = UserPro[0].Connect_Port;
  let gender = UserPro;
  let Processor = UserPro[0].Processor;
  let Chipset = UserPro[0].Chipset;
  let Graphic = UserPro[0].Graphic;
  let Display_Screen = UserPro[0].Display_Screen;
  let Main_Memory = UserPro[0].Main_Memory;
  let Storage = UserPro[0].Storage;
  let OS = UserPro[0].OS;
  let Change_Lens = UserPro[0].Change_Lens;
  let DCategory = UserPro[0].category;
  let IMG = UserPro[0].imgProduct;
  let DDetail = UserPro[0].detail;
  let idPro = UserPro[0].link;
  let id = UserPro[0].id;
  let washAble = UserPro[0].washAble;
  let capacity = UserPro[0].capacity;
  let weight = UserPro[0].weight;
  let effPix = UserPro[0].effPix;
  let senPix = UserPro[0].senPix;
  let maxRes = UserPro[0].maxRes;
  let minRes = UserPro[0].minRes;
  let sensor = UserPro[0].sensor;
  let manual = UserPro[0].manual;
  let dust = UserPro[0].dust;
  let stable = UserPro[0].stable;
  let fromCountry = UserPro[0].fromCountry;
  let notUser = UserPro[0].notUser;
  let netAmount = UserPro[0].netAmount;
  let face = UserPro[0].face;
  let opZoom = UserPro[0].opZoom;
  let dgZoom = UserPro[0].dgZoom;
  let aRange = UserPro[0].aRange;
  let speed = UserPro[0].speed;
  let iso = UserPro[0].iso;
  let material = UserPro[0].material;
  let surface = UserPro[0].surface;
  let player = UserPro[0].player;
  let circum = UserPro[0].circum;
  let special = UserPro[0].special;
  let place = UserPro[0].place;
  let fragile = UserPro[0].fragile;
  let height = UserPro[0].height;
  let avalible = UserPro[0].avalible;
  let water = UserPro[0].water;
  let display = UserPro[0].display;
  let platform = UserPro[0].platform;
  let call = UserPro[0].call;
  let noti = UserPro[0].noti;
  let fitness = UserPro[0].fitness;
  let Battery_Life = UserPro[0].Battery_Life;
  let music = UserPro[0].music;
  let security = UserPro[0].security;
  let wash = UserPro[0].wash;
  let serface = UserPro[0].serface;
  let rope = UserPro[0].rope;
  let sport = UserPro[0].sport;
  let slip = UserPro[0].slip;
  let nAmount = UserPro[0].nAmount;
  let animal = UserPro[0].animal;
  let stateFood = UserPro[0].stateFood;
  let online = UserPro[0].online;
  let hour = UserPro[0].hour;
  let wire = UserPro[0].wire;
  let hood = UserPro[0].hood;
  let pocket = UserPro[0].pocket;
  let sleeve = UserPro[0].sleeve;
  let free = UserPro[0].free;
  let imgRatio = UserPro[0].imgRatio;
  const pushComment = [];
  const Comment = await dbo.collection("Comment").find({ id: id }).toArray();

  Comment.map((item) => {
    pushComment.push(item);
  });

  if (CheckM.product1 === 0) {
    return null;
  }

  const updateAmount1 = {
    $set: {
      product1: {
        Img: IMG,
        productName: DProductName,
        price: DPrice,
        brand,
        Lens,
        Change_Lens,
        DCategory,
        size,
        Type,
        rate,
        Years,
        Age,
        washAble,
        weight,
        effPix,
        senPix,
        maxRes,
        minRes,
        sensor,
        manual,
        dust,
        stable,
        fromCountry,
        notUser,
        netAmount,
        face,
        opZoom,
        dgZoom,
        aRange,
        speed,
        iso,
        material,
        surface,
        player,
        circum,
        special,
        imgRatio,
        place,
        fragile,
        height,
        avalible,
        capacity,
        water,
        display,
        platform,
        call,
        noti,
        fitness,
        Portable,
        Battery_Life,
        music,
        security,
        Connect_Port,
        gender,
        Processor,
        Chipset,
        Graphic,
        wash,
        serface,
        rope,
        sport,
        slip,
        nAmount,
        animal,
        stateFood,
        online,
        hour,
        wire,
        hood,
        pocket,
        sleeve,
        free,
        Display_Screen,
        Main_Memory,
        Storage,
        OS,
        detail: DDetail,
        link: idPro,
        Star,
        Comment: pushComment,
      },
    },
  };
  const updateAmount2 = {
    $set: {
      product2: {
        Img: IMG,
        productName: DProductName,
        price: DPrice,
        brand,
        Lens,
        Change_Lens,
        DCategory,
        size,
        Type,

        rate,
        Years,
        Age,
        washAble,
        weight,
        effPix,
        senPix,
        maxRes,
        minRes,
        sensor,
        manual,
        dust,
        stable,
        fromCountry,
        notUser,
        netAmount,
        face,
        opZoom,
        dgZoom,
        aRange,
        speed,
        iso,
        material,
        surface,
        player,
        circum,
        special,
        imgRatio,
        place,
        fragile,
        height,
        avalible,
        capacity,
        water,
        display,
        platform,
        call,
        noti,
        fitness,
        Portable,
        Battery_Life,
        music,
        security,
        Connect_Port,
        gender,
        Processor,
        Chipset,
        Graphic,
        wash,
        serface,
        rope,
        sport,
        slip,
        nAmount,
        animal,
        stateFood,
        online,
        hour,
        wire,
        hood,
        pocket,
        sleeve,
        free,
        Display_Screen,
        Main_Memory,
        Storage,
        OS,
        detail: DDetail,
        link: idPro,
        Star,
        Comment: pushComment,
      },
    },
  };
  const updateAmount3 = {
    $set: {
      product3: {
        Img: IMG,
        productName: DProductName,
        price: DPrice,
        brand,
        Lens,
        Change_Lens,
        DCategory,
        size,
        Type,
        rate,
        Years,
        Age,
        washAble,
        weight,
        effPix,
        senPix,
        maxRes,
        minRes,
        sensor,
        manual,
        dust,
        stable,
        fromCountry,
        notUser,
        netAmount,
        face,
        opZoom,
        dgZoom,
        aRange,
        speed,
        iso,
        material,
        surface,
        player,
        circum,
        special,
        imgRatio,
        place,
        fragile,
        height,
        avalible,
        capacity,
        water,
        display,
        platform,
        call,
        noti,
        fitness,
        Portable,
        Battery_Life,
        music,
        security,
        Connect_Port,
        gender,
        Processor,
        Chipset,
        Graphic,
        wash,
        serface,
        rope,
        sport,
        slip,
        nAmount,
        animal,
        stateFood,
        online,
        hour,
        wire,
        hood,
        pocket,
        sleeve,
        free,
        Display_Screen,
        Main_Memory,
        Storage,
        OS,
        detail: DDetail,
        link: idPro,
        Star,
        Comment: pushComment,
      },
    },
  };

  if (
    CheckM.product1 === null &&
    CheckM.product2 === null &&
    CheckM.product3 === null
  ) {
    dbo
      .collection("Compare")
      .findOneAndUpdate({ email: editEmail }, updateAmount1);
    res.status(200).send({ message: "Changed Your info" });
  } else if (
    CheckM.product1 !== null &&
    CheckM.product2 === null &&
    CheckM.product3 === null
  ) {
    if (CheckM.product1.DCategory === DCategory) {
      dbo
        .collection("Compare")
        .findOneAndUpdate({ email: editEmail }, updateAmount2);
      res.status(200).send({ message: "Changed Your info" });
    } else {
      res.status(400).send({ message: "Wrong Category" });
    }
  } else if (
    CheckM.product1 !== null &&
    CheckM.product2 !== null &&
    CheckM.product3 === null
  ) {
    if (CheckM.product1.DCategory === DCategory) {
      dbo
        .collection("Compare")
        .findOneAndUpdate({ email: editEmail }, updateAmount3);
      res.status(200).send({ message: "Changed Your info" });
    } else {
      res.status(400).send({ message: "Wrong Category" });
    }
  } else if (
    CheckM.product1 !== null &&
    CheckM.product2 !== null &&
    CheckM.product3 !== null
  ) {
    if (CheckM.product1.DCategory === DCategory) {
      dbo
        .collection("Compare")
        .findOneAndUpdate({ email: editEmail }, updateAmount3);
      res.status(200).send({ message: "Changed Your info" });
    } else {
      res.status(400).send({ message: "Wrong Category" });
    }
  }
  //var newValue = { $set: { name:name , birthdate : date , Tel : tel , gender : gender , img }};
  // if (CheckM) {
  //   //dbo.collection("User").updateOne(CheckM,newValue )
  //   if (CheckM.product1 === null) {
  //     await dbo
  //       .collection("Compare")
  //       .findOneAndUpdate({ email: editEmail }, updateAmount1);
  //     res.status(200).send({ message: "Changed Your info" });
  //   } else if (CheckM.product2 === null) {
  //     await dbo
  //       .collection("Compare")
  //       .findOneAndUpdate({ email: editEmail }, updateAmount2);
  //     res.status(200).send({ message: "Changed Your info" });
  //   } else if (CheckM.product3 === null) {
  //     await dbo
  //       .collection("Compare")
  //       .findOneAndUpdate({ email: editEmail }, updateAmount3);
  //     res.status(200).send({ message: "Changed Your info" });
  //   } else {
  //     await dbo
  //       .collection("Compare")
  //       .findOneAndUpdate({ email: editEmail }, updateAmount3);
  //     res.status(200).send({ message: "Changed Your info" });
  //   }
  // } else {
  //   return res.status(400).send({ message: "Don't have this email" });
  // }
  // } catch (err) {
  //   res.status(400).send({ message: "Error to get data", err });
  // }
};
