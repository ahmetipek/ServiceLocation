var express=require('express')
var app=express()

var userRoleModel=require('../model/userRoleModel')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Tüm veriyi listeler.
app.get('/',function(req,res){
    userRoleModel.find({},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

//id değerine göre modeli getirir.
app.get('/:id',function(req,res){
    userRoleModel.findById({'_id':req.params.id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

//Yeni kayıt yapar. 
app.post('/',function(req,res){
    var userRolePostModel=new userRoleModel(req.body)
    userRolePostModel.save(function(err,response){
          if(err)
          res.send(err)
          res.send(response)
    })
})

//Update işlemini yapar
app.post('/userRoleUpdate',function(req,res){
    var conditions={'_id':req.body._id}
    userRoleModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

//Gönderilen parametrelere göre filtreleme işlemi yapar
app.post('/filterUserRole',function(req,res){
    userRoleModel.find(req.body,function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

//ilgili kaydı siler
app.delete('/',function(req,res){
    userRoleModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})
module.exports=app