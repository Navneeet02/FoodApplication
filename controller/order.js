const {Order,ProductCart}= require('../models/order')

 
exports.getOrderById=(req,res,next,id)=>{
Order.findById(id)
.populate("products.product", "name price")
.exec((err,order)=>{
    if(err){
        return res.status(400).json({
            err:"Cannot find order"
        })
    }
    req.order=order;
    next();
})
};

exports.createOrder=()=>{
//this method is populated by my param getUserById that why i  am using req.profile
req.body.order.user=req.profile;
const order= new Order(req.body.order);
order.save((err,order)=>{
    if(err){
        return res.status(400).json({
            err:"Failed to save your order on the db"
        })
    }
    res.json(order);
})
}

exports.getAllOrders=()=>{
    Order.find()
    .populate("user", "_id name")
    .exec((err, orders)=>{
        if(err){
            return res.status(400).json({
                error:"No order Found"
            })
        }
        res.json(orders)
    })
}

exports.updateStatus=()=>{
Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
            return res.status(400).json({
                err:"Order not Updated"
            })
            }
            res.json(order)
        }
)

}

exports.getOrderStatus=()=>{
res.json(Order.schema.path("status").enumValues)
}