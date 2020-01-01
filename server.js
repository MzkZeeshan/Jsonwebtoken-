const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.listen(3000, (req, res) => console.log("server is listening"));
app.get("/get", (req, res) => res.json("get function is running"));

// In this function we are creating token  and also save data of user in jwt
//The data which will get when we will verifying token
app.post("/login", (req, res) => {
  const user = {
    user: "mzk",
    psd: "123456"
  };
  jwt.sign(user, "privatekey", (err, token) => {
    // res.json("post is created and");
    res.json({
      token: token,
      user
    });
  });
});

// here we verify token and alse get data of useer in auth data
app.post("/post", verifyToken, (req, res) => {
  jwt.verify(req.token, "privatekey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        msg: "post created",
        authData
      });
    }
  });
});

//in this function we are getting token from headers
function verifyToken(req, res, next) {
  const header = req.headers["auth"]; //THIS IS THE KEY OF HEADER
  if (header != undefined) {
    // const token = header.split(" ");//In this portion i commented beacuse of useless header

    // req.token = token[1]; //this portion we send token with my name and split it by programing

    req.token = header; //here we save token in req.token
    next();
  } else {
    res.sendStatus(403);
  }
}
