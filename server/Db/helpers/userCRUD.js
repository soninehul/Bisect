const userModel = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "splitat123@gmail.com",
    pass: "Abbajabba@123",
  },
});

function sendemail(email, txt){
  let mailOptions = {
    from: "splitat123@gmail.com",
    to: email,
    subject: "Bisect:New Account Activity",
    text: txt,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

const userOperation = {
  AddUser(userObject, response) {
    userModel.create(userObject, (err, doc) => {
      if (err) {
        console.log("Error is ", err);
        response.json({ Status: "F" });
      } else {
        response.json({ Status: "S", record: doc });
      }
    });
  },

  login(userObject, response) {
    userModel.findOne(userObject, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        if (doc) {
          jwt.sign({ doc }, "secretkey", { expiresIn: "1h" }, (err, token) => {
            response.json({
              Status: "S",
              msg: "welcome bro " + doc.username,
              token: token,
            });
          });
        } else {
          response.json({ Status: "F", msg: "Invalid username or password" });
        }
      }
    });
  },

  async AddFriend(userObject, response) {
    let check = await this.Find(userObject.username);
    console.log(check);
    //console.log(mailOptions.text);
    if (check) {
      userModel.findOneAndUpdate(
        { username: userObject.defaultUser },
        {
          $push: {
            friends: userObject.username,
            expensis: { name: userObject.username, data: {} },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log(err);
          } else {
            sendemail(check.email,`Dear ${userObject.username}, ${userObject.defaultUser} added you to his Friend List.`);
            response.json({ Status: "S", msg: "Added succesfully", doc: doc });
          }
        }
      );
    } else {
      console.log("status Fail");
      response.json({ Status: "F", msg: "your friend is not registerd yet" });
    }
  },
  Find(username) {
    return userModel.findOne({ username }, function (err, doc) {
      if (err) {
        console.log(err);
        //   return false;
      } else {
        if (doc) {
          console.log(doc);
          // return true;
        } else {
          console.log("not Found");
          //  return false;
        }
      }
    });
  },

  async AddExp(userObject, response) {
    let check = await this.Find(userObject.user);
    userModel.findOneAndUpdate(
      { username: userObject.username, "expensis.name": userObject.user },
      {
        $set: {
          "expensis.$.data.desc": userObject.inp.description,
          "expensis.$.data.date": userObject.inp.date,
        },
        $inc: { "expensis.$.data.ammount": userObject.inp.amount },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
         if(check) sendemail(check.email,`Dear ${userObject.user}, ${userObject.username} added a Bisect bill of ${userObject.inp.amount} for ${userObject.inp.description} `);
          response.json({ Status: "S", msg: "Added succesfully", doc: doc });
        }
      }
    );
  },

  async settle(userObject, response) {
    let check = await this.Find(userObject.user);
    userModel.findOneAndUpdate(
      { username: userObject.username, "expensis.name": userObject.user },
      { $inc: { "expensis.$.data.ammount": userObject.val } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
          if(check) sendemail(check.email,`Dear ${userObject.user}, ${userObject.username} added settle of ${userObject.val} in the Bisect`);
          response.json({ Status: "S", msg: "Added succesfully", doc: doc });
        }
      }
    );
  },
};

module.exports = userOperation;
