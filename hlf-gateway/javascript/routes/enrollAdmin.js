var express = require('express');
var router = express.Router();
var api = require('../controller/enrollAdmin');
/* GET home page. */


/**
 * @swagger
 * /enrolladmin/enrollAdminapi:
 *   post:
 *     tags:
 *       - enrollAdminapi 
 *     description: CREATE ADMIN 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: ADMIN Created  Successfully!
 *       404:
 *         description: An identity for the admin user \"admin\" already exists in the wallet
 *       500:
 *         description: Internal Server Error
 */
router.post('/enrollAdminapi', api.enrollAdminapi);  
 module.exports = router;



