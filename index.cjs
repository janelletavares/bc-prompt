let store = require('store')

let express = require('express');
const app = express();
const path = require('path');
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

const hostname = '127.0.0.1';
const port = 3000;



app.use(express.static(path.join(__dirname, '/public')));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, '/prompt.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/admin',function(req,res){
  res.sendFile(path.join(__dirname, '/admin.html'));
});

app.get('/login',function(req,res){
  res.sendFile(path.join(__dirname, '/login.html'));
});


app.get('/prompts',function(req,res){
  console.log("GET /prompts")
  let prompts = []
  let val = store.get("prompts")
  if (val === null || val === "" || val === undefined) {
    store.set("prompts", JSON.stringify(prompts))
  } else {
    prompts = JSON.parse(val)
  }
  console.log("prompts= "+prompts)
  res.json(prompts)
});

app.post('/prompts', jsonParser, function(req,res){
  console.log("POST /prompts")
  console.log("prompts="+req.body)
  if (req.body !== "" && req.body !== null && req.body !== undefined) {
    store.set("prompts", JSON.stringify(req.body))
  }
  res.json(true)
});

app.get('/prompt',function(req,res){
  console.log(req.headers)
  console.log("GET /prompt")
  let index = store.get("index")
  let int = 0
  if (index !== null && index !== undefined) {
    int = parseInt(index)
  }
  console.log("index; "+int)

  let prompt = ""
  let val = store.get("prompts")
  console.log("val: "+val)
  if (val !== null && val !== "" && val !== undefined) {
    let prompts = JSON.parse(val)
   console.log("prompts: "+prompts)
    if (int < prompts.length) {
      prompt = prompts[int]
    }
  }
  console.log("prompt: "+prompt)
  res.json(prompt)
});


app.get('/index',function(req,res){
  console.log("GET /index")
  let val = store.get("index")
  if (val === null || val === "" || val === undefined) {
    val = 0
    store.set("index", val)
  }
  console.log("index= "+val)
  res.json(val)
});

app.post('/index',jsonParser, function(req,res){
  console.log("POST /index")
  console.log("index= "+JSON.stringify(req.body))
  let int = parseInt(req.body.index)
  store.set("index", int)
  console.log("index= "+int)
  res.json(true)
});


app.get('/authentication',function(req,res){
  let ret = "unauthenticated"
  let val = store.get("authenticated")
  console.log("fetched authenticated= "+val);
  if (val === null || val === "" || val === undefined) {
    console.log("defining")
    ips = []
    store.set("authenticated", JSON.stringify(ips))
  } else {
    ips = JSON.parse(val)
  }
  let referer = req.header("x-forwarded-for")
  console.log("referer "+referer)
  if (referer !== "" && referer !== null && referer !== undefined) {
    let index = referer.lastIndexOf("/")// subtract last /
    let origin = referer.slice(0, index)
    for (let i = 0; i < ips.length; i++) {
      if (ips[i] === origin) {
        res.json("letsgo")
        return
      }
    }
  }
  res.json(ret)
});

app.post('/authentication',jsonParser, function(req,res){
  console.log(req.headers)
  let ret = "unauthenticated"
  let val = store.get("authenticated")
  let ips = []
  if (val === null || val === "" || val === undefined) {
    ips = []
    store.set("authenticated", JSON.stringify(ips))
  } else {
    ips = JSON.parse(val)
  }
  let origin = req.header("x-forwarded-for")
  for (let i = 0; i < ips.length; i++) {
    console.log("comparing "+ips[i]+" "+origin)
    if (ips[i] === origin) {
      res.json("letsgo")
      return
    }
  }

  let adminUsername = process.env.ADMIN_USERNAME
  let adminPassword = process.env.ADMIN_PASSWORD
  let success = req.body.username === adminUsername && req.body.password === adminPassword;

  if (success === true) {
    ret = "letsgo"
    ips.push(origin)
    console.log("storing "+JSON.stringify(ips))
    store.set("authenticated", JSON.stringify(ips))
  }
  console.log("ret "+ret)
  res.json(ret)
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});