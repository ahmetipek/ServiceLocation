var express=require('express')
var app=express()

var companyInfoModel=require('../model/companyInfoModel')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    companyInfoModel.find({},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.get('/:id',function(req,res){
    companyInfoModel.findById({'_id':req.params.id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/',function(req,res){
    var companyInfoPostModel=new companyInfoModel(req.body)
    companyInfoPostModel.save(function(err,response){
          if(err)
          res.send(err)
          res.send(response)
    })
})

app.post('/companyInfoUpdate',function(req,res){
    var conditions={'_id':req.body._id}
    companyInfoModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/filterCompanyInfo',function(req,res){
    companyInfoModel.find(req.body,function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})
app.delete('/',function(req,res){
    companyInfoModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})
module.exports=app