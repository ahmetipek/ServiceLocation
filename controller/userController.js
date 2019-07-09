var express=require('express')
var app=express();
var userModel=require('../model/userModel');
var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',function(req,res){
    userModel.find({},function(err,services){
        if(err)
        res.send(err)
        res.send(services)
    })
})

app.get('/:id',function(req,res){
    var id=req.params.id;
    userModel.findById({"_id":id},function(err,service){
        if(err)
        res.send(err)
        res.send(service)
    })
})

app.post('/',function(req,res){
    var postUserModel=new userModel(req.body);
    postUserModel.save(function(err,result){
        if(err)
        res.send(err)
        res.send(result)
    })
})
app.post('/userUpdate',function(req,res){
    var conditions = {"_id":req.body._id }
    userModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,result){
         if(err)
         res.send(err)
         res.send(result)
     })
})

app.delete('/',function(req,res){
    console.log(req.body._id)
    userModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        console.log(response);
        res.send(response)
    })
})

//searchKey parametresi gönderilir. Ad ve Soyada göre filtrleme yapar
app.post('/userSearch',function(req,res){
   if(req.body.searchKey!=undefined&&req.body.searchKey!=""){
    userModel.find({$or:[{"name":new RegExp(req.body.searchKey,"i")},{"lastName":new RegExp(req.body.searchKey,"i")}]},function(err,response){
        if(err)
        res.send(err)
        if(response.length==0)
        res.send({serviceMessage:"Sonuç Bulunamadı!"})
      else res.send(response)
    })
}
else res.send({serviceMessage:"Arama kelimesi girilmedi"})
})
module.exports=app;