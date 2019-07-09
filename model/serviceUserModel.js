var config=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(config);
var Schema=mongoose.Schema;

var serviceUserModel=mongoose.model('ServiceUser',new Schema({
   name:{type:String,required:true},
   userRoleId:{type:Schema.Types.ObjectId,required:true},
   serviceId:{type:Schema.Types.ObjectId,required:true},
   description:String,
})

)

module.exports=serviceUserModel