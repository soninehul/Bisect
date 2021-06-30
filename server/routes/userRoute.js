const app = require('express').Router();
const jwt = require('jsonwebtoken');
const userOperation = require('../Db/helpers/userCRUD');
app.post("/login",(req,res)=>{
    // console.log("header is ",req.header);
    console.log(req.body);
    userOperation.login(req.body,res);
})

app.post("/signup",(req,res)=>{
    
    console.log(req.body);
    userOperation.AddUser(req.body,res);
})

app.post("/getData",async(req,res)=>{
    let result =  await userOperation.Find(req.body.username);

    if(result){
        res.json({user: result});
    }else{
        console.log("not possible");
    }
})

app.get("/getUser",(req,res)=>{
    
    // console.log(req.headers['authorization']);

    const bearerHeader = req.headers['authorization'];
    // bearer Header or token = "bearer <token>" 
    if(typeof bearerHeader !== 'undefined'){

      const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];
    //  console.log('this is ',bearerToken);
    jwt.verify(bearerToken,'secretkey',(err,authData)=>{
      if(err){
          console.log(err);
          res.sendStatus(403);
      }else{
        //   console.log(authData);
          res.json({userdata: authData});
      }
    });

    }else{
        res.sendStatus(403);
    }
   
})

app.post('/AddFriend',(req,res)=>{
    console.log("Hello data ",req.body);
    userOperation.AddFriend(req.body,res);
})

app.post('/getData',(req,res)=>{
    console.log("hello",req.body);
   
})

app.post('/addExp',(req,res)=>{
    userOperation.AddExp(req.body,res);
})
app.post('/settle',(req,res)=>{
    userOperation.settle(req.body,res);
})

module.exports =  app;