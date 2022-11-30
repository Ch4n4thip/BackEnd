const mongoUtil = require("../config/database");
const { MongoClient } = require("mongodb");

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  // Connect fecth qurey = result
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);

  socket.on("send_message", (data, sender, target) => {
    dbo.collection("Message").findOneAndUpdate(
      {
        $or: [
          {
            Send: data.Sender,
            Target: data.Target,
          },
          {
            Target: data.Sender,
            Send: data.Target,
          },
        ],
      },
      { $push: { Message: { Sender: data.Sender, Message: data.message } } }
    );

    dbo.collection("Message").findOne(
      {
        $or: [
          {
            Send: data.Sender,
            Target: data.Target,
          },
          {
            Target: data.Sender,
            Send: data.Target,
          },
        ],
      },
      function (err, result) {
        if (err) {
          throw err;
        }

        socket.broadcast.emit("receive_message", result);
        socket.emit("receive_message", result);
      }
    );
    //ADD DATABASE data.Target && data.sender data.message
  });
});

io.on("disconnect", (socket) => {
  console.log("User Disconnected");
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

exports.getChatBody = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);

  const query = req.query;
  const newQuery = query.User;
  const useQuery = newQuery?.replaceAll('"', "");

  const emailQuery = query.Target;
  const newEmailQuery = emailQuery?.replaceAll('"', "");

  try {
    await dbo
      .collection("Message")
      .find({
        $or: [
          {
            Send: useQuery,
            Target: newEmailQuery,
          },
          {
            Target: useQuery,
            Send: newEmailQuery,
          },
        ],
      })

      .project({
        _id: 0,
        Send: 1,
        Target: 1,
        Message: 1,
      })
      .toArray((err, result) => {
        if (err) {
          res.status(400).send({ message: "Cannot connect to database" });
        }

        //Send to Front
        io.on("chat message", () => {
          io.emit("chat to front", result);
        });

        res.send(result);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.getChatName = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);

  const query = req.query;
  const newQuery = query.User;
  const useQuery = newQuery?.replaceAll('"', "");

  const emailQuery = query.Target;
  const newEmailQuery = emailQuery?.replaceAll('"', "");

  try {
    await dbo
      .collection("User")
      .find({ email: useQuery })

      .project({
        _id: 0,
        name: 1,
        // shopName:1,
        // Send:1,
        // Target:1,
        // Message:1,
      })
      .toArray((err, result) => {
        if (err) {
          res.status(400).send({ message: "Cannot connect to database" });
        }

        res.send(result);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.getChatHistory = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);

  const query = req.query;
  const newQuery = query.User;
  const useQuery = newQuery?.replaceAll('"', "");

  const emailQuery = query.Target;
  const newEmailQuery = emailQuery?.replaceAll('"', "");

  try {
    await dbo
      .collection("Message")
      .find({
        $or: [
          {
            Send: useQuery,
          },
          {
            Target: useQuery,
          },
        ],
      })

      .project({
        _id: 0,
        Send: 1,
        Target: 1,
        Message: 1,
      })
      .toArray((err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send({ message: "Cannot connect to database" });
        }

        res.send(result);
      });
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.ToChat = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  try {
  const dbo = client.db(process.env.DB_NAME);

  const { Email, Target } = req.body;
  if(Email === null){
    return res.status(400).send({message:"Email is null"})
  }else{
  const newEmail = Email.replaceAll('"', "");

    var CheckD = await dbo.collection("Message").findOne({
      $or: [
        {
          Send: newEmail,
          Target: Target,
        },
        {
          Send: Target,
          Target: newEmail,
        },
      ],
    });

    let myobj = {
      Send: newEmail,
      Target: Target,
      Message: [],
    };
    if (newEmail === Target) {
      res.status(400).send("Fail");
    } else if (CheckD) {
      res.status(200).send("Success");
    } else {
      dbo.collection("Message").insertOne(myobj);
      dbo.collection("MessageHistory").insertOne(myobj);

      res.status(200).send("Success");
    }
  }
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};

exports.sendChat = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const dbo = client.db(process.env.DB_NAME);

  const { Email, Send, Target, Msg } = req.body;

  const newEmail = Email.replaceAll('"', "");

  try {
    //Add to DB

    dbo
      .collection("Message")
      .findOneAndUpdate(
        { Send: Send, Target: Target },
        { $push: { Message: { Sender: newEmail, Message: Msg } } }
      );

    io.emit("chat message", Msg);
  } catch (err) {
    res.status(400).send({ message: "Error to get data", err });
  }
};
