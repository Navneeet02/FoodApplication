var express = require('express');
var router= express.Router();

const {getUserById,getUser,updateUser,userPurchaseList}=require("../controller/user")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controller/auth")

router.param("userId",getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated, getUser)
router.put("/user/:userId",isSignedIn,isAuthenticated, updateUser)
router.get("/order/user/:orderId",isSignedIn,isAuthenticated,userPurchaseList)



module.exports=router