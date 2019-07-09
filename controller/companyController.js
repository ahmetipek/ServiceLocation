var express=require('express')
var app=express()

var companyModel=require('../model/companyModel')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    companyModel.find({},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.get('/:id',function(req,res){
    companyModel.findById({'_id':req.params.id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/',function(req,res){
    var companyPostModel=new companyModel(req.body)
    companyPostModel.save(function(err,response){
          if(err)
          res.send(err)
          res.send(response)
    })
})

app.post('/companyUpdate',function(req,res){
    var conditions={'_id':req.body._id}
    companyModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/filterCompany',function(req,res){
    companyModel.find(req.body,function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.delete('/',function(req,res){
    companyModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

module.exports=app