var express = require('express');
var router= express.Router();

const {isSignedIn,isAuthenticated,isAdmin}= require('../controller/auth')
const {}= require('../controller/category')
const {getUserById}= require('../controller/user')
const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories}

= require('../controller/product')


router.param("userId",getUserById);
router.param("productId",getProductById);

//routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)
router.get('/products', getAllProducts)
router.get('/products/categories',getAllUniqueCategories)

module.exports=router