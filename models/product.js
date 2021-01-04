var mongoose = require("mongoose");
const {ObjectId}= mongoose.Schema

const productSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        maxlength: 2000,
        trim: true,
      },
      price: {
        type:Number,
        required:true,
        maxlength: 32,
        trim: true,
      },

      //here we are making connection with diffrent schema 
      category:{
         type:ObjectId,
         ref:"Category", //put the exact same name from where you are pulling these thing exactly
         required:true
      },
      stock:{
          type:Number
      },
      sold:{
          type:Number,
          default:0
      },
      photo:{
          data:Buffer,
          contentType:String,
      }
})

module.exports=mongoose.model("Product",productSchema)