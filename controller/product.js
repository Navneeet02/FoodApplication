const Product = require("../models/product")
const formidable=require('formidable')
const _ = require("lodash")
const fs=require('fs');
const { sortBy } = require("lodash");


exports.getProductById=(req,res,next,id)=>{
Product.findById(id)
.populate("Category")
.exec((err,prod)=>{
    if(err){
        return res.status(400).json({
            error:"No Product  avaliable"
        })
    }
    req.product=prod;
next();
})

}

exports.createProduct=(req,res)=>{
let form=new formidable.IncomingForm();
form.keepExtension=true; //this is true so that we can handle all types of photo extension

form.parse(req,(err,fields,file)=>{
    if(err){
        return res.status(400).json({
            error:"Problem with Images"
        })
    }
 // destructing the feilds
const {name,description,price,category,stock,photo}= fields
if(!name && !description && !price && !category && !stock && !photo){
    return res.json({
        error:"Please include all the feilds"
    })
}

    let product = new Product(fields);
    //handle the file
    if(file.photo){
        if(file.photo.size>8000000){
            return res.status(400).json({
                error:"File size is Too Big"
            })
        }
        product.photo.data=fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type;
    }
    //save to database
    
    product.save((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Saving tshirt to db failed"
            })
        }
        res.json(product)
    })
})
}

//getting product based on the id
//here we are undefined it beacuse we want that is just parse the data and for 
//we can load it to the background it will make our applicatio reducliously fast.
exports.getProduct=(req,res)=>{
req.product.photo=undefined;
res.status(200).json(req.product)  
}

//middlware
exports.photo=(req,res,next)=>{
if(req.product.photo.data){
    res.set("Content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
}
next()
}


//delet routes
exports.deleteProduct=(req,res)=>{
let product =req.product;
product.remove((err,deletedProduct)=>{

    if(err){
        return res.status(400).json({
            error:"Not delete successfully"
        })
    }
res.json({
    msg:"deleted Successfully",
    deleteProduct
})
})

}

//update routes
exports.updateProduct=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtension=true; //this is true so that we can handle all types of photo extension
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with Images"
            })
        }

    
        let product = req.product;
        //here loadash will extends of fetct the thigs we want to update using the fields from formidable
        product= _.extend(product,fields)

        //handle the file
        if(file.photo){
            if(file.photo.size>8000000){
                return res.status(400).json({
                    error:"File size is Too Big"
                })
            }
            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type;
        }
        //save to database   
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Saving tshirt to db failed"
                })
            }
            res.json(product)
        })
    })
    }


//listing route
exports.getAllProducts=()=>{
let limit =req.query.limit? parseInt(req.query.limit): 8
let sortBy = req.query.sortBy? req.query.sortBy:"_id"
Product.find()
.select("-photo")
.populate("category")
.sort([[sortBy, "asc"]])
.limit(limit)
.exec((err,products)=>{
    if(err){
        return res.status(400).json({
            err:"no poduct found "
        })
    }
    res.json(products)
})

}

exports.getAllUniqueCategories=()=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                err:"No category found"
            })
        }
        res.json(category)
    })
}

 

//update stock 
//bulk wrtie you can perform multiple operation and usign the filter you can update the feild 
//you wants
exports.updateStock=(req,res,next)=>{
    
let myoperation= req.body.order.products.map((prod)=>{

    return{
        updateOne:{
            filter:{_id:prod._id},
            update:{$inc: {stock:-prod.count, sold:+prod.count}}
        }
    }
})
Product.bulkWrite(myoperation,{},(err,product)=>{
    if(err){
        return res.status(400).json({
            err:"bulk operation failed"
        })
    }
});
next();
}





