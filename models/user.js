var mongoose = require("mongoose");
var crypto = require('crypto')
var uuidv1 = require('uuidv1')

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 32,
    trim: true,
  },
  userinfo:{
      type:String,
      trim:true
  },

  encry_password: {
    type: String,
    required:true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
});

//setter and getter of 
userSchema.virtual("password")
.set(function(password){
    this._password=password
    this.salt=uuidv1();
    this.encry_password=this.securePassword(password)
})
.get(function(){

    return this._password
})

userSchema.methods={

    authenticate:function(plainpassword){
      return this.securePassword(plainpassword)===this.encry_password
    },
    securePassword:function(plainpassword){
        if(!plainpassword) return "";
        try{
             return crypto
             .createHmac("sha256",this.salt)
             .update(plainpassword)
             .digest("hex")

        }catch(err){
          return ""
        }
    }
}



module.exports= mongoose.model("User",userSchema);