//imports
var express=require('express')
var app=express();
var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var apiRoutes = express.Router(); 
//ninjects
var serviceLocationController=require('../controller/serviceLocationController')
var serviceController=require('../controller/serviceController')
var userController=require('../controller/userController')
var projectController=require('../controller/projectController')
var roleController=require('../controller/roleController')
var companyController=require('../controller/companyController')
var companyInfoController=require('../controller/companyInfoController')
var companyInfoEnumController=require('../controller/companyInfoEnumController')
var userRoleController=require('../controller/userRoleController')
var serviceUserController=require('../controller/serviceUserController')
var addressController=require('../controller/addressController')

var serviceModel=require('../model/serviceModel') 
var userModel=require('../model/userModel')
//Authenticate
var config=require('../config/secret')
var morgan = require('morgan')
var jwt=require('jsonwebtoken')

app.set('superSecret', config.secret);
app.use(morgan('dev'));


//config
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

app.post('/setup', function(req, res) {

  // create a sample user
var userPostModel=new userModel(req.body)
  // save the sample user
  userPostModel.save(function(err,user) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json(user);
  });
});

app.get('/getAllService', function(req, res) {

serviceModel.find({},function(err,service){
  if(err)
  res.send(err)
  res.send(service)
})

});

apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  //email ve passworda göre sorgulanabilir.
  userModel.findOne(req.body, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } 
      else if(!user.isActive){
        res.json({ success: false, message: 'Kullanıcı aktif değil.' });
      }
      else {
         
        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      email: user.email 
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          userId:user._id,
          serviceKey:user.serviceKey,
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
 
  var token = req.body.token || req.query.token || req.headers['x-access-token']||req.headers['authorization']||req.headers['origin']||req.headers['origin']||req.headers['Content-Type']||req.headers['X-Requested-With']||req.headers['Accept'];
  // decode token 
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

app.use('/api',apiRoutes)


//initalize
apiRoutes.use('/serviceLocationController',serviceLocationController)
apiRoutes.use('/serviceController',serviceController)
apiRoutes.use('/userController',userController)
apiRoutes.use('/projectController',projectController)
apiRoutes.use('/roleController',roleController)
apiRoutes.use('/companyController',companyController)
apiRoutes.use('/companyInfoController',companyInfoController)
apiRoutes.use('/companyInfoEnumController',companyInfoEnumController)
apiRoutes.use('/userRoleController',userRoleController)
apiRoutes.use('/serviceUserController',serviceUserController)
apiRoutes.use('/addressController',addressController)
  //export
module.exports=app