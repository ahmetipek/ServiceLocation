var express=require('express')
var app=express();
var serviceModel=require('../model/serviceModel');
var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    serviceModel.find({},function(err,services){
        if(err)
        res.send(err)
        res.send(services)
    })
})

app.get('/:id',function(req,res){
    var id=req.params.id;
    serviceModel.findById({"_id":id},function(err,service){
        if(err)
        res.send(err)
        res.send(service)
    })
})

app.post('/',function(req,res){
    var postServiceModel=new serviceModel(req.body);
    postServiceModel.save(function(err,result){
        if(err)
        res.send(err)
        res.send(result)
    })
})
app.post('/serviceUpdate',function(req,res){
    var conditions = {"_id":req.body._id }
    serviceModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,result){
         if(err)
         res.send(err)
         res.send(result)
     })
})
app.post('/serviceFilter',function(req,res){
    serviceModel.find(req.body,function(err,result){
         if(err)
         res.send(err)
         res.send(result)
     })
})

app.delete('/',function(req,res){
    serviceModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

//searchKey parametresi gönderilir. Ada göre filtrleme yapar
app.post('/serviceSearch',function(req,res){
    if(req.body.searchKey!=undefined&&req.body.searchKey!=""){
        serviceModel.find({"name":new RegExp(req.body.searchKey,"i")},function(err,response){
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