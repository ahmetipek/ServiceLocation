var express=require('express')
var app=express()

var addressModel=require('../model/addressModel')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    addressModel.find({},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })

    //Pagination için
    // addressModel.find({},function(err,response){
    //     if(err)
    //     res.send(err)
    //     res.send(response)
    // }).sort({'enumId':'desc'}).skip(0).limit(10)
})

app.get('/:id',function(req,res){
    addressModel.findById({'_id':req.params.id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/',function(req,res){
    var addressPostModel=new addressModel(req.body)
    addressPostModel.save(function(err,response){
          if(err)
          res.send(err)
          res.send(response)
    })
})

app.post('/addressUpdate',function(req,res){
    var conditions={'_id':req.body._id}
    addressModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.delete('/',function(req,res){
    addressModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

module.exports=app