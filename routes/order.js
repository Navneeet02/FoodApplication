var express = require('express');
var router= express.Router();

const {getUserById,pushOrderInPurchaseList}=require("../controller/user")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controller/auth")
const {updateStock}=require('../controller/product')
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} =require('../controller/order')

//param
router.param("userId",getUserById)
router.param("orderId",getOrderById)

router.post('/order/create/:userId',isSignedIn,isAuthenticated,pushOrderInPurchaseList,
updateStock,
createOrder)

router.get('/order/all/:userId',isSignedIn,isAuthenticated,isAdmin,getAllOrders)

//status of order routes
router.get('/order/status/userId',isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put('/order/:orderId/status/:userId',isSignedIn,isAuthenticated,isAdmin,updateStatus)


module.exports=router;