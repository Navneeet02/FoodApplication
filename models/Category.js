var mongoose = require('mongoose');
const { model } = require('./user');

const typeSchema= new mongoose.Schema(
{
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:200,
        
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("Category", typeSchema)