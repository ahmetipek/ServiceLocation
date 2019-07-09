var express=require('express')
var app=express()

var serviceUserModel=require('../model/serviceUserModel')
var serviceModel=require('../model/serviceModel')
var userRoleModel=require('../model/userRoleModel') 
var userModel=require('../model/userModel')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    serviceUserModel.find({},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.get('/:id',function(req,res){
    serviceUserModel.findById({'_id':req.params.id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/',function(req,res){
    var serviceUserPostModel=new serviceUserModel(req.body)
    serviceUserPostModel.save(function(err,response){
          if(err)
          res.send(err)
          res.send(response)
    })
})

app.post('/serviceUserUpdate',function(req,res){
    var conditions={'_id':req.body._id}
    serviceUserModel.findOneAndUpdate(conditions,req.body,{upsert:true},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

app.post('/filterServiceUser',function(req,res){
    serviceUserModel.find(req.body,function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})
app.post('/filterServiceUserModel',function(req,res){
    serviceUserModel.findOne(req.body,function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})
app.delete('/',function(req,res){
    serviceUserModel.deleteOne({'_id':req.body._id},function(err,response){
        if(err)
        res.send(err)
        res.send(response)
    })
})

//plaka bilgisi ve userRoleId parametreleri gönderildiğinde ilgili servis kullanıcısının bilgilerini gönderir.
//Bu servis kullanıcısı gönderilen userRoleId değerine göre değişebilir.
//Örneğin Şöfore ait userRoleId gönderilmişse şöförün bilgilerini gönderir.
app.post('/getServiceUserInfo',function(req,res){
    var identityNumber="";
    if(req.body.identityNumber==null||req.body.identityNumber==undefined||req.body.identityNumber=="")
    res.send({"serviceMessage":"Plaka bilgisi gönderilmedi"})
    else{
    serviceModel.findOne({"identityNumber":req.body.identityNumber},function(err,response){
        if(err)
        res.send(err)
        else if(response!=null){
        serviceUserModel.findOne({"serviceId":response._id,"userRoleId":req.body.userRoleId},function(err,serviceUserResponse){
       if(err)
       res.send(err)
       else if(serviceUserResponse!=null){
       var serviceModel={}
        identityNumber=response.identityNumber;
       
         userRoleModel.findOne({"_id":serviceUserResponse.userRoleId},function(err,userRoleResponse){
           if(err)
           res.send(err)
           else if(userRoleResponse!=null){
           userModel.findOne({"_id":userRoleResponse.userId},function(err,userModelResponse){
               if(err)
               res.send(err)
               serviceModel=JSON.stringify(userModelResponse);
               var newServiceModel=JSON.parse(serviceModel);
               newServiceModel.identityNumber=identityNumber
               res.send(newServiceModel)
           })
        }
        else res.send({"serviceMessage":"Kullanıcıya Ait Rol Bulunamadı"})
         })
        }
        else res.send({"serviceMessage":"İlgili Servis Kullanıcısı Bulunamadı"})
        })
        }
        else res.send({"serviceMessage":"İlgili Servis Bulunamadı"})
    })
}
})
module.exports=app