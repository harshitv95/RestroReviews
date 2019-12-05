const express = require("express");
const mdb = require("mongodb");
const server = express();
var bodyParser = require("body-parser");
const cors = require("cors");

const MongoClient = mdb.MongoClient;

const DB_URL = "mongodb://localhost:27017";
const DB_NAME = "restro_reviews";

server.use(
  cors({
    origin: "http://localhost:4200"
  })
);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var dbo;
MongoClient.connect(DB_URL, (err, db) => {
  dbo = db.db(DB_NAME);
});

server.get("/restaurants", (req, resp) => {
  // MongoClient.connect(DB_URL, (err, db) => {
  //     let dbo = db.db(DB_NAME);
  let queryParams = {};
  if (!!req.query["title"])
    queryParams["title"] = new RegExp(".*" + req.query["title"] + ".*", "i");
  if (!!req.query["categories"])
    queryParams["categories"] = req.query["categories"];
  console.log(req.query);
  dbo
    .collection("restaurants")
    .find(queryParams)
    .toArray((err, res) => {
      console.log(res);
      if (!!err) resp.status(400).send([{ status: 'Server Error. "+err+"' }]);
      else resp.send(JSON.stringify(res));
    });
  // });
});

server.get("/restaurant", (req, resp) => {
  let query_uuid = req.query.uuid;
  // MongoClient.connect(DB_URL, (err, db) => {
  //     let dbo = db.db(DB_NAME);
  dbo.collection("restaurants").findOne({ uuid: query_uuid }, (err, res) => {
    if (!!err) resp.status(400).send({ status: 'Server Error. "+err+"' });
    else resp.send(res);
  });
  // });
});

server.get("/menu", (req, resp) => {
  let query_uuid = req.query.uuid;
  dbo
    .collection("restaurant_menus")
    .findOne({ uuid: query_uuid }, (err, res) => {
      if (!!err) resp.status(400).send({ status: 'Server Error. "+err+"' });
      else {
        if (!res) resp.send({});
        else {
          const { menu, menuClassifications: classifications } = res;
          resp.send({ menu, classifications });
        }
      }
    });
});

server.get("/reviews", (req, resp) => {
  let query_uuid = req.query.uuid;
  dbo
    .collection("restaurant_reviews")
    .findOne({ uuid: query_uuid }, (err, res) => {
      if (!!err) resp.status(400).send({ status: 'Server Error. "+err+"' });
      else {
        if (!res || !res.reviews) resp.send({});
        else {
          resp.send(res.reviews);
        }
      }
    });
});

server.post("/login", (req, resp) => {
  // const {username, password} = req.body;
  let username = req.body["username"];
  let password = req.body["password"];
  const params = { username, password };
  // MongoClient.connect(DB_URL, (dbErr, db) => {
  //     let dbo = db.db(DB_NAME);
  dbo.collection("users").findOne(params, (err, res) => {
    if (!!err || !res)
      resp.send({ status: "failed", errorMessage: err, res: res });
    else resp.send(res);
  });
  // });
});

server.post("/postReview", (req, resp) => {
  let uuid = req.body.uuid;
  let review = JSON.parse(req.body.review);
  dbo.collection("restaurant_reviews").findOne({ uuid }, (err, res) => {
    let oldRev = res.reviews;
    oldRev.push(review);
    dbo.collection("restaurant_reviews").updateOne(
      { uuid },
      {
        $set: {
          reviews: oldRev
        }
      }
    );
    resp.send();
  });
});

server.post("/editReview", (req, resp) => {
  let uuid = req.body.uuid;
  let review = JSON.parse(req.body.review);
  let idx = parseInt(req.body.index);
  dbo.collection("restaurant_reviews").updateOne(
    { uuid },
    {
      $set: {
        [`reviews.${idx}`]: review
      }
    },
    () => {
      resp.send();
    }
  );
});

server.post("/deleteReview", (req, resp) => {
  let uuid = req.body.uuid;
  let idx = parseInt(req.body.index);
  dbo.collection("restaurant_reviews").updateOne(
    { uuid },
    {
      $unset: {
        [`reviews.${idx}`]: 1
      }
    },
    () => {
      dbo.collection("restaurant_reviews").updateOne(
        { uuid },
        {
          $pull: {
            'reviews': null
          }
        },
        () => {
          resp.send();
        }
      );
    }
  );
});

server.post("/newRestro", (req, resp)=> {
    
});

server.listen(8879, () => {
  console.log("Server started, and listening on port 8879");
});
