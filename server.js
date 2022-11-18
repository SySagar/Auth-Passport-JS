const express = require('express');
const { mongoose } = require('mongoose');
const app = express();
const {connectMongoose , User} = require('./database.js')
const ejs = require('ejs')
const passport = require('passport');
const {initializingPassport , isAuth} = require("./passportConfig.js")
const expressSession = require('express-session');
connectMongoose();

initializingPassport(passport);

app.use(express.json)
app.use(express.urlencoded({extended: true}));
app.use(expressSession({secret: "secret", reverse: false , saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session())

app.set("view engine", 'ejs');

app.get('/', (req,res)=>{
    res.render("./views/index.ejs")
})

app.get("/register" ,(req,res)=>{
    res.render("./views/login")
})


app.get("/login", (req,res)=>{
    res.render("./views/register")
})

app.post("/register", async (req,res)=>{
    
    const user = await  User.findOne({userName: req.body.userName})

    if(user)
    return res.status(400).send("user already exists")

    const newUser  = await User.create(req.body);
    res.status(201).send(newUser)
})

app.post('/login',passport.authenticate("local",{failureRedirect:"/register" , successRedirect:"/"}) , async(req,res)=>{
})

app.get("/profile",isAuth,(req,res)=>{
    res.send(req.user);
})

app.get('/logout',(req,res)=>{
    req.logout();
    res.send('logged out')
})

app.listen(3000 , ()=>{
    console.log("listening 3000");
})

