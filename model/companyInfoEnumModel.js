var dbConfig=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(dbConfig)
var Schema=mongoose.Schema

var CompanyInfoEnumModel=mongoose.model('CompanyInfoEnum',new Schema({
    name:{type:String,required:true},
    description:String
}))
module.exports=CompanyInfoEnumModel;