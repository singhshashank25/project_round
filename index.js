const express = require('express');
const app = express();
const port = 3000;
const router_registration = require("./router/registration")
require("dotenv").config();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const router_login = require("./router/login");
const cookieParser = require("cookie-parser");
const isAuth = require("./middelware/auth");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(cookieParser());

const dburl = process.env.MongoURI;
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected successfully...'))
    .catch((err) => console.log('DB could not connect!\nError: ',err));

app.set('view engine','ejs')


app.get("/",isAuth,(req,res)=>{
    return res.json({mes:"yes you are login"});
})

app.use("/registration",router_registration);
app.use("/login",router_login);

app.listen(port,(req,res)=>{
    console.log("listining on locahost:",port);
})