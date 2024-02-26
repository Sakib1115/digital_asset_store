var express = require('express');
var router = express.Router();
var api = require('../controller/query');
console.log("inside routes/query.js");
/* GET home page. */


/**
 * @swagger
 * /query/queryPartner:
 *   post:
 *     tags:
 *       - queryPertnership
 *     description: Query Data By gpId & Partnership ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ID
 *         description: General partner ID
 *         in: formData
 *         required: false
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: false
 *       - name: token
 *         description: jwt token
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: view Data  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/queryPartner',api.queryPartner);
/**
 * @swagger
 * /query/getHistoryForId:
 *   post:
 *     tags:
 *       - getHistoryForId
 *     description: Query Partnership History By Partnership ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: token
 *         description: jwt token
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: view Data  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/getHistoryForId',api.getHistoryForId);
/**
* @swagger
* /query/queryAllPartner:
*   post:
*     tags:
*       - queryallpartnership
*     description:  hit for query partnership 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: jwt token
*         in: formData
*         required: true
*     responses:
*       200:
*         description: view partnership Successfully!
*       404:
*         description: Invalid details
*       500:
*         description: Internal Server Error
*/
router.post('/queryAllPartner',api.queryAllPartner);
/**
 * @swagger
 * /query/patnershipbyname:
 *   post:
 *     tags:
 *       - queryPertnership
 *     description: Query Partnership Data By Partnership Name
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_Name
 *         description: Partnership Name
 *         in: formData
 *         required: true
 *       - name: token
 *         description: jwt token
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: view Data  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/patnershipbyname',api.patnershipbyname); 

/**
 * @swagger
 * /query/queryForLp:
 *   post:
 *     tags:
 *       - queryForLp
 *     description: Query Partnership Data By Partnership ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: LP_Id
 *         description: Limited partner ID
 *         in: formData
 *         required: false
 *       - name: Partnership_ID
 *         description: partnership ID
 *         in: formData
 *         required: false
 *       - name: token
 *         description: jwt token
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: view Data  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/queryForLp',api.queryForLp);

/**
 * @swagger
 * /query/querybydate:
 *   post:
 *     tags:
 *       - querybydate
 *     description: Query Partnership Data By Partnership date
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_Since
 *         description: Partnership Since
 *         in: formData
 *         required: true
 *       - name: token
 *         description: jwt token
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: view Data  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post('/querybydate',api.querybydate); 


router.post('/queryGp',api.queryGp);
router.post('/getHistoryGpById',api.getHistoryGpById);
router.post('/queryLp',api.queryLp);
router.post('/getHistoryLpById',api.getHistoryLpById);




router.post('/GpqueryForlp',api.GpqueryForlp);


module.exports = router;  