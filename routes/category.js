var express = require('express');
var router= express.Router();
const {getUserById,getUser}=require("../controller/user")
const {isSignedIn,isAdmin,isAuthenticated}=require("../controller/auth")
const{getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory}

= require('../controller/category')


//params for extracting the id
router.param("userId",getUserById);
router.param("categoryId",getCategoryById) 

//actual routes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
router.get("/category/:categoryId", getCategory)
router.get("/categories",getAllCategory)
router.put('/category/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,updateCategory)
router.delete('/category/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteCategory)

module.exports=router