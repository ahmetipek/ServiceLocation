var express=require('express')
var app=express()

var roleModel=require('../model/roleModel')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    roleModel.find({},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })

    //Pagination için
    // roleModel.find({},function(err,response){
    //     if(err)
    //     res.send(err)
    //     res.send(response)
    // }).sort({'enumId':'desc'}).skip(0).limit(10)
})

app.get('/:id',function(req,res){
    roleModel.findById({'_id':req.params.id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/',function(req,res){
    var rolePostModel=new roleModel(req.body)
    rolePostModel.save(function(err,response){
          if(err)
          res.send(err)
          res.send(response)
    })
})

app.post('/roleUpdate',function(req,res){
    var conditions={'_id':req.body._id}
    roleModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.delete('/',function(req,res){
    roleModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

module.exports=app