var dbConfig=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(dbConfig)
var Schema=mongoose.Schema

var companyInfoModel=mongoose.model('CompanyInfo',new Schema({
    name:{type:String,required:true},
    companyId:Schema.Types.ObjectId,
    companyInfoEnumId:{type:Schema.Types.ObjectId,required:true},
    description:String
}))

module.exports=companyInfoModel