var express=require('express')
var app=express()

var companyInfoEnumModel=require('../model/companyInfoEnumModel')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',function(req,res){
    companyInfoEnumModel.find({},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.get('/:id',function(req,res){
    companyInfoEnumModel.findById({"_id":req.params.id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/',function(req,res){
    var companyInfoEnumPostModel=new companyInfoEnumModel(req.body)
    companyInfoEnumPostModel.save(function(err,response){
          if(err)
          res.send(err)
          res.send(response)
    })
})

app.post('/companyInfoEnumUpdate',function(req,res){
    var conditions={"_id":req.body._id}
    companyInfoEnumModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})
app.delete('/',function(req,res){
    companyInfoEnumModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})
module.exports=app