var mongoose = require('mongoose');
const{ObjectId}=mongoose.Schema


const ProductCartSchema= new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number
}); 

const ProductCart= mongoose.model("ProductCart",ProductCartSchema)


const orderSchema= new mongoose.Schema({

products:[ProductCartSchema],
transaction_id:{},
amount:{type:Number},
address:{type:String},
status  :{
type:String,
default:"Recevied",
enum:["cancelled", "Deliverd","Shipped","processing","Recevied"]
},
update:{Date},
user:{
    type:ObjectId,
    ref:"User"       //by this we are refering to the user table 
},
},
{timestamps:true}
)

const Order=mongoose.model("Order",orderSchema)

module.exports={Order,ProductCart}