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
  let val = store.get("prompts")
  if (val === null || val === "" || val === undefined) {
    val = []
    store.set("prompts", val)
  }
  console.log("prompts= "+JSON.stringify(val))
  res.json(val)
});

app.post('/prompts', jsonParser, function(req,res){
  console.log("POST /prompts")
  console.log("prompts="+req.body)
  if (req.body !== "" && req.body !== null && req.body !== undefined) {
    store.set("prompts", req.body)
  }
  res.json(true)
});

app.get('/prompt',function(req,res){
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
    prompt = val[int]
  }
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
  let val = store.get("authenticated")
  console.log("stored authenticated= "+val);
  if (val === null || val === "" || val === undefined) {
    console.log("defining")
    val = false
  }
  res.json(val)
});

app.post('/authentication',jsonParser, function(req,res){
  let val = "unauthenticated"
  store.set("authenticated", val)
  console.log("body: "+JSON.stringify(req.body))

  let adminUsername = process.env.ADMIN_USERNAME
  let adminPassword = process.env.ADMIN_PASSWORD
  let success = req.body.username === adminUsername && req.body.password === adminPassword;
  if (success === true) {
    val = "letsgo"
    store.set("authenticated", val)
  }
  res.json(val)
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});