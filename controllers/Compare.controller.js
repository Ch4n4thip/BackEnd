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
  let Material = UserPro[0].Material;
  let rate = UserPro[0].rate;
  let Years = UserPro[0].Years;
  let Age = UserPro[0].Age;
  let Portable = UserPro[0].Portable;
  let Connect_Port = UserPro[0].Connect_Port;
  let gender = UserPro
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
        Material,
        rate, 
        Years,
        Age,
        Portable,
        Connect_Port,
        gender,
        Processor,
        Chipset,
        Graphic,
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
        Material,
        rate, 
        Years,
        Age,
        Portable,
        Connect_Port,
        gender,
        Processor,
        Chipset,
        Graphic,
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
        Material,
        rate, 
        Years,
        Age,
        Portable,
        Connect_Port,
        gender,
        Processor,
        Chipset,
        Graphic,
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

  if(CheckM.product1 === null && CheckM.product2 === null && CheckM.product3 === null)
  {
    dbo.collection("Compare")
    .findOneAndUpdate({ email: editEmail }, updateAmount1);
    res.status(200).send({ message: "Changed Your info" });
  }
  else if( CheckM.product1 !== null && CheckM.product2 === null && CheckM.product3 === null ){
    if(CheckM.product1.DCategory === DCategory)
    {
      dbo.collection("Compare")
    .findOneAndUpdate({ email: editEmail }, updateAmount2);
    res.status(200).send({ message: "Changed Your info" });
    }else{
      res.status(400).send({ message: "Wrong Category" })
    }
  }
  else if( CheckM.product1 !== null && CheckM.product2 !== null && CheckM.product3 === null ){
    if(CheckM.product1.DCategory === DCategory)
    {
      dbo.collection("Compare")
    .findOneAndUpdate({ email: editEmail }, updateAmount3);
    res.status(200).send({ message: "Changed Your info" });
    }else{
      res.status(400).send({ message: "Wrong Category" })
    }
  }
  else if( CheckM.product1 !== null && CheckM.product2 !== null && CheckM.product3 !== null ){
    if(CheckM.product1.DCategory === DCategory)
    {
      dbo.collection("Compare")
    .findOneAndUpdate({ email: editEmail }, updateAmount3);
    res.status(200).send({ message: "Changed Your info" });
    }else{
      res.status(400).send({ message: "Wrong Category" })
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
