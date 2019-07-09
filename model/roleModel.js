var dbConfig=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(dbConfig)
var Schema=mongoose.Schema

var roleModel=mongoose.model('Role',new Schema({
    name:{type:String,required:true},
    description:{type:String},
    enumId:{type:Number,required:true}
}))
module.exports=roleModel;