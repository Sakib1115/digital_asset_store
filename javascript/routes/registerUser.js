var express = require('express');
var router = express.Router();
var api = require('../controller/registerUser');
/* GET home page. */
router.post('/registerUserApi', api.registerUserApi);  // t
 module.exports = router;




