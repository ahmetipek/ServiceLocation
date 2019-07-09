var dbConfig=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(dbConfig)
var Schema=mongoose.Schema

var userRoleModel=mongoose.model('UserRole',new Schema({
    name:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,required:true},
    roleId:{type:Schema.Types.ObjectId,required:true},
    description:String
}))

module.exports=userRoleModel