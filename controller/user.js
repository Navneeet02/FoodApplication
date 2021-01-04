var User = require('../models/user');

exports.getUserById=(req,res,next,id)=>{
User.findById(id).exec((err,result)=>{
    if(err || !result){
      return   res.status(401).json({
            error:"No user was In  the DB"
        })
    }
    req.profile=result
    next();
})
}

exports.getUser=(req,res)=>{
req.profile.salt=undefined
req.profile.encry_password=undefined
    return res.json(req.profile)
};


exports.updateUser=(req,res)=>{
User.findByIdAndUpdate(
    {_id:req.profile._id},
    {$set:req.body}, //we are updating every thing what ever we have in req,body
    {new:true, useFindAndModify:false},
    (err,result)=>{
        if(err || !result){
            return   res.status(401).json({
                  error:"Updating the DB not successfull"
              })
          }
         result.salt=undefined
         result.encry_password=undefined //we dont need thoese fiels that why we simply put it undefined
        
         res.json(result)
    }
)

}

//populate is used if we want to refer a diffrent schema and wants to populate something from there
exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No Order in this Account"
            })
        }
        return res.json(order)
    })
}

//middleware
exports.pushOrderInPurchaseList=(req,res,next)=>{

let purchases=[]

req.body.order.products.forEach(product=>{
    purchase.push({
        _id:product._id,
        name:product.name,
        description:product.description,
        category:product.category,
        quantity:product.quantity,
        amount:req.body.order.amount,
        transaction_id:req.body.order.transaction_id
        
    })
})

//store this in db
User.findOneAndUpdate(
    {_id:req.profile._id},
    {$push:{purchases:purchases}},
    {new:true},
    (err,purchases)=>{
        if(err){
            return res.status(400).json({
                error:"Unable to save  in Purchase List"
            })
        }
        next()
    }
)
}





