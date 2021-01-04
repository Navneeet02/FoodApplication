var express = require('express');
var router= express.Router();
const {signup,signin, signout, isSignedIn}= require('../controller/auth')
const{check}= require('express-validator')
var expressJwt = require('express-jwt');



router.post('/signup',[

    check("name","Name should be alteast three letter").isLength({min:3}),
    check("email","Email is required").isEmail({min:3}),
    check("password","Password is required of min three character").isLength({min:3})

],signup)

router.post('/signin',[
    check("email","Email is required").isEmail({min:3}),
    check("password","Password is required of min three character").isLength({min:3})


],signin)   

router.get('/signout',signout)

router.get('/testroute',isSignedIn,(req,res)=>{
res.json(req.auth)
})

module.exports=router