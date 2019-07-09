var config=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(config);
var Schema=mongoose.Schema;

var userModel=mongoose.model('User',new Schema({
    name:{type:String, required:true},
lastName:{type:String, required:true},
email:String,
activePhoneNumber:{type:String, required:true},
secondoryPhoneNumber:String,
password:String,
description:String,
isActive:Boolean,
serviceKey:String,
primaryAddressId:{type:Schema.Types.ObjectId}
})

)


module.exports=userModel