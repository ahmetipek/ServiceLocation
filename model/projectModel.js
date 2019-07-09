var dbConfig=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(dbConfig)
var Schema=mongoose.Schema

var ProjectModel=mongoose.model('Project',new Schema({
    name:{type:String,required:true},
    description:String
}))
module.exports=ProjectModel;