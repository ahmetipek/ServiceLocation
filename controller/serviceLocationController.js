var express=require('express')
var app=express();
var serviceLocationModel=require('../model/serviceLocationModel');
var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose=require('mongoose')

app.get('/',function(req,res){
    serviceLocationModel.find({},function(err,result){
        if(err)
        res.send(err)
        res.send(result)
    })
})

app.get('/:id',function(req,res){
    var id=req.params.id;
    serviceLocationModel.findById({"_id":id},function(err,result){
        if(err)
        res.send(err)
        res.send(result)
    })
})

app.post('/',function(req,res){
    var postServiceModel=new serviceLocationModel(req.body);
    postServiceModel.save(function(err,result){
        if(err)
        res.send(err)
        res.send(result)
    })
})

app.get('/getServiceId/:serviceId',function(req,res){
serviceLocationModel.findOne({"serviceId":mongoose.Types.ObjectId(req.params.serviceId)},function(err,result){
    if(err)
    res.send(err)
    res.send(result)
})
})

app.post('/serviceLocationUpdate',function(req,res){
       var conditions = {"_id":req.body._id }
        serviceLocationModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,result){
            if(err)
            res.send(err)
            res.send(result)
        })
    
})

app.post('/serviceLocationFilter',function(req,res){
    serviceLocationModel.find(req.body,function(err,result){
         if(err)
         res.send(err)
         res.send(result)
     })
})

module.exports=app;