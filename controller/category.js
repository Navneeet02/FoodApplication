const { json } = require("body-parser");
const Category = require("../models/Category")

exports.getCategoryById=(req,res,next,id)=>{

Category.findById(id).exec((err,cate)=>{

    if(err){
        return res.status(400).json({
            error:"No Food of This type is avaliable"
        })
    }
    req.category=cate;
})

    next()
}

exports.createCategory=(req,res)=>{
const category = new Category(req.body)
category.save((err,category)=>{
    if(err){
        return res.status.json({
            error:"Types not created"
        })
    }
    res.json({category})
})
}
//getting a single category
exports.getCategory=(req,res)=>
{
return res.json(req.category);
}

exports.getAllCategory=()=>{
    Category.find().exec((err,items)=>{
        if(err){
            return res.status(400).json({
                error:"No Food of This type is avaliable"
            })
        }
        res.json(items)
    })
}

exports.updateCategory=(req,res)=>{
const category=req.category;
category.name=req.body.name;
category.save((err,updateCategory)=>{
    if(err){
        return res.status(400).json({
            error:"Failed to update item"
        })
    }
    res.json(updateCategory)
})

}

exports.deleteCategory=(req,res)=>{
    const category=req.category;
category.remove((err,item)=>{
    if(err){
        return res.status(400).json({
            error:"Failed to delete item"
        })
    }
res.json({
    message:`DELETED SUCCESSFULLY ${category}`
})
})

}