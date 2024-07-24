const router = require("express").Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    return res.render('login',{
        message:"",
        title: "Log In | "
    })
})

router.post("/",async(req,res)=>{
    console.log(req.body);
    let email = req.body.email
    let password = req.body.password;
    if(email=="" || password==""){
        return res.render("login",{
            message:"Invalid email or pass",
            title : "Log In |"
        })
    }
    const user = await User.findOne({email:email});
    if(!user){
        return res.render("login",{
            message:"User not found",
            title : "Log In |"
        })
    }

    const validPassword = await bcrypt.compare(password,user.password);

    if(!validPassword){
        return res.render("login",{
            message:"wrong password",
            title : "Log In |"
        })
    }
    const token = await user.generateAuthToken();
    res.cookie("token",token,{httpOnly:true})
    return res.json({msg:"login done",token:token});
})

module.exports = router;