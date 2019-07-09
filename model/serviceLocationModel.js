var config=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(config);
var Schema=mongoose.Schema;
var serviceLocation=mongoose.model('ServiceLocation',new Schema({
    name:String,
    serviceId:Schema.Types.ObjectId,
    xStartCoord:String,
    yStartCoord:String,
    xUpdateCoord:String,
    yUpdateCoord:String,
    isActive:Boolean
})

)

module.exports=serviceLocation