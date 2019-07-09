var express=require('express')
var app=express()

var projectModel=require('../model/projectModel')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',function(req,res){
    projectModel.find({},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.get('/:id',function(req,res){
    projectModel.findById({"_id":req.params.id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/',function(req,res){
    var projectPostModel=new projectModel(req.body)
    projectPostModel.save(function(err,response){
          if(err)
          res.send(err)
          res.send(response)
    })
})

app.post('/projectUpdate',function(req,res){
    var conditions={"_id":req.body._id}
    projectModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})
app.delete('/',function(req,res){
    projectModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

module.exports=app