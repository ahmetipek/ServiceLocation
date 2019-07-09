var config=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(config);
var Schema=mongoose.Schema;
var service=mongoose.model('Service',new Schema({
    name:String,
   identityNumber:String,
   capacity:Number,
   companyId:{type:Schema.Types.ObjectId,required:true}
})

)

module.exports=service