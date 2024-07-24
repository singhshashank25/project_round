const router = require("express").Router();
const {User,Validate} = require("../models/user");
const bcrypt = require("bcrypt")

router.get("/",(req,res)=>{
    return res.render('signup',{
        message:"",
        title: "signup | "
    })
})

router.post("/",async(req,res)=>{
    console.log(req.body);  // getting body null i do not why
    // console.log(req);
    const {error} = Validate(req.body);
    // console.log(error)
    if(error)return res.status(400).json({
        message:"There may be some errro",
        err:error.details[0].message
    })

    const user_email = await User.findOne({email:req.body.email});
    if(user_email)return res.status(409).json({message:"already user is register"});

    const user_name = await User.findOne({email:req.body.username});
    if(user_name)return res.status(409).json({message:"already user is register with this username"});

    const salt = await bcrypt.genSalt(5);
    const hashpassword = await bcrypt.hash(req.body.password,salt);

    let newUser = await new User({
        ...req.body,
        password:hashpassword
    })
    await newUser.save();
    const token = await user.generateAuthToken();
    res.cookie("token",token,{httpOnly:true}) //frontend not work

    return res.status(200).json({msg:"new user is created",user:newUser,token:token});
})

module.exports = router