const { validationResult } = require("express-validator");
const user = require("../models/user");
const User = require("../models/user")
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt')



exports.signup=(req,res)=>{
const error = validationResult(req);
if(!error.isEmpty()) {
    return res.status(422).json({
        error:error.array()[0].msg
    })
}

const user = new User(req.body)
user.save((err,result)=>{
    if(err){
        console.log(err)
     return  res.status(400).json({
            error:"Not Saved to Database"
        })
    }
    console.log(result)
    res.json({
        name:result.name,
        email:result.email,
        id: result._id
        
    })
});

}
//sign in method for the user 
exports.signin=(req,res)=>{
const error = validationResult(req);

const {password, email}= req.body;

if(!error.isEmpty()) {
    return res.status(422).json({
        error:error.array()[0].msg
    })
}
User.findOne({email},(err,result)=>{
    if(err || !result){
       return res.status(400).json({
            error:"User Doesn't exist"
        })
    }
    if(!result.authenticate(password)){
       return  res.status(401).json({
            error:"Email and Password Do not Match"
        })
    }

    const token = jwt.sign({_id:result._id}, process.env.SECRET)
    //cookie use key value pair key="token" value=token
    res.cookie("token", token, {expire: new Date()+9999});

    const {name,email,_id,role} = result
    return res.json({
        token, user:{_id,name,email,role}
    })
})

}
//signout method 
exports.signout=(req,res)=>{
res.clearCookie("token")
res.json({
    message:"SignOut Successfully"
})
}

//protected routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth",
    algorithms: ['HS256'],
    //predefined functio userproperty
});


//custom middleware 
exports.isAuthenticated=(req,res,next)=>{
    //auth have the property which contain id of the user and  a property iat which is not used.
    let checker= req.profile && req.auth && req.profile._id===req.auth._id;
    if(checker){
      return  res.status(422).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
if(req.profile.role===0){

    return res.status(422).json({
        error:"YOU ARE NOT ADMIN"
    })
}

    next();
}

