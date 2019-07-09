var config=require('../config/dbConfig')
var mongoose=require('mongoose')
mongoose.connect(config);
var Schema=mongoose.Schema;

var addressModel=mongoose.model('Address',new Schema({
 name:{type:String},
xCoord:String,
yCoord:String
})

)


module.exports=addressModel