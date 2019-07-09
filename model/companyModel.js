var dbConfig=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(dbConfig)
var Schema=mongoose.Schema

var companyModel=mongoose.model('Company',new Schema({
    name:{type:String,required:true},
    projectId:{type:Schema.Types.ObjectId,required:true},
    description:String
}))

module.exports=companyModel