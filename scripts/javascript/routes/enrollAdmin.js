var express = require('express');
var router = express.Router();
var api = require('../controller/enrollAdmin');
/* GET home page. */
router.post('/enrollAdminapi', api.enrollAdminapi);  // t
 module.exports = router;



