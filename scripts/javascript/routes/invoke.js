var express = require('express');
var router = express.Router();
var api = require('../controller/invoke');


/**
 * @swagger
 * /invoke/createPartnership:
 *   post:
 *     tags:
 *       - createPartnership 
 *     description: create partnership 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: Partnership_Code
 *         description: Partnership Code
 *         in: formData
 *         required: true
 *       - name: Partnership_Name
 *         description: Partnership Name
 *         in: formData
 *         required: false
 *       - name: Partnership_Since
 *         description: Partnership Since
 *         in: formData
 *         required: false
 *       - name: IsActive
 *         description: Partnership Is Active
 *         in: formData
 *         required: false
 *       - name: Partnership_Summary
 *         description: Partnership Summary
 *         in: formData
 *         required: false
 *       - name: ID
 *         description: General Partner ID
 *         in: formData
 *         required: true
 *       - name: Firstname
 *         description: General partner FirstName
 *         in: formData
 *         required: false
 *       - name: Lastname
 *         description: General partner LastName
 *         in: formData
 *         required: false
 *       - name: Email
 *         description: General Partner Email
 *         in: formData
 *         required: false
 *       - name: AMID
 *         description: Account Manager ID
 *         in: formData
 *         required: true
 *       - name: FirstName
 *         description: Account Manager First Name
 *         in: formData
 *         required: false
 *       - name: LastName
 *         description: Account Manager Last Name
 *         in: formData
 *         required: false
 *       - name: AMEmail
 *         description: Account Manager Email
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: partnership Created  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/createPartnership',api.createPartnership);    

/**
 * @swagger
 * /invoke/updatePartnership:
 *   post:
 *     tags:
 *       - updatePartnership 
 *     description: Update partnership detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: Partnership_Name
 *         description: Partnership Name
 *         in: formData
 *         required: false
 *       - name: Partnership_Since
 *         description: Partnership Since
 *         in: formData
 *         required: false
 *       - name: Partnership_Summary
 *         description: Partnership Summary
 *         in: formData
 *         required: false
 *       - name: IsActive
 *         description: Partnership Active or Not
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: partnership Updated  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post ('/updatePartnership',api.updatePartnership);

/**
 * @swagger
 * /invoke/deletePartnership:
 *   post:
 *     tags:
 *       - deletePartnership 
 *     description: delete partnership detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: partnership deleted  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/deletePartnership',api.deletePartnership);


/**
 * @swagger
 * /invoke/updateGP:
 *   post:
 *     tags:
 *       - updateGP 
 *     description: Update partnership detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: ID
 *         description: General Partner ID
 *         in: formData
 *         required: true
 *       - name: Firstname
 *         description: General Partner FirstName
 *         in: formData
 *         required: false
 *       - name: Lastname
 *         description: General Partner LastName
 *         in: formData
 *         required: false
 *       - name: Email
 *         description: General Partner Email
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: General Partner Updated  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/updateGP',api.updateGP);

/**
 * @swagger
 * /invoke/updateAM:
 *   post:
 *     tags:
 *       - updateAM 
 *     description: Update partnership detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: AMID
 *         description: Account Manager ID
 *         in: formData
 *         required: true
 *       - name: FirstName
 *         description: Account Manager FirstName
 *         in: formData
 *         required: false
 *       - name: LastName
 *         description: Account Manager LastName
 *         in: formData
 *         required: false
 *       - name: Email
 *         description: Account Manager EMAIL
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: partnership Updated  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/updateAM',api.updateAM);

/**
 * @swagger
 * /invoke/changeGP:
 *   post:
 *     tags:
 *       - changeGP 
 *     description: change General Partner 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: ID
 *         description: General Partner ID
 *         in: formData
 *         required: true
 *       - name: Firstname
 *         description: General Partner FirstName
 *         in: formData
 *         required: false
 *       - name: Lastname
 *         description: General Partner LastName
 *         in: formData
 *         required: false
 *       - name: Email
 *         description: General Partner Email
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: General Partner change  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/changeGP',api.changeGP);

/**
 * @swagger
 * /invoke/changeAM:
 *   post:
 *     tags:
 *       - changeAM 
 *     description: change Account Manager  
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: AMID
 *         description: Account Manager ID
 *         in: formData
 *         required: true
 *       - name: FirstName
 *         description: Account Manager FirstName
 *         in: formData
 *         required: false
 *       - name: LastName
 *         description: Account Manager LastName
 *         in: formData
 *         required: false
 *       - name: Email
 *         description: Account Manager EMAIL
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: account manager change Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/changeAM',api.changeAM);



/**
 * @swagger
 * /invoke/addLP:
 *   post:
 *     tags:
 *       - addLP 
 *     description: Create Limited Partner details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: LP_Id
 *         description: Limited Partner ID
 *         in: formData
 *         required: true
 *       - name: FirstName
 *         description: Limited Partner FirstName
 *         in: formData
 *         required: false
 *       - name: LastName
 *         description: Limited Partner LastName
 *         in: formData
 *         required: false
 *       - name: Email
 *         description: Limited Partner Email
 *         in: formData
 *         required: false
 *       - name: Status
 *         description: Limited Partner Status
 *         in: formData
 *         required: false
 *       - name: Partnership_Since
 *         description: Limited Partnership Since
 *         in: formData
 *         required: false
 *       - name: Preferred_Return
 *         description: Limited Partner Presferred Return
 *         in: formData
 *         required: false
 *       - name: Catch_Up
 *         description: Limited Partner Catch Up
 *         in: formData
 *         required: false
 *       - name: Carried_Interest
 *         description: Limited Partner Carried Interest 
 *         in: formData
 *         enum: [ "5%", "10%", "15%"]
 *         required: false
 *       - name: IRR
 *         description: Limited Partner IRR
 *         in: formData
 *         required: false
 *       - name: Next_Carried_Interest
 *         description: Limited Partner Next Carried Interest
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: partnership Updated  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/addLP',api.addLP);  

/**
 * @swagger
 * /invoke/investment_in_lp:
 *   post:
 *     tags:
 *       - investment_in_lp 
 *     description: investment details 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: LP_Id
 *         description: Limited Partner ID
 *         in: formData
 *         required: true
 *       - name: InvestmentID
 *         description: Investment ID
 *         in: formData
 *         required: true
 *       - name: Amount
 *         description: investment Amount
 *         in: formData
 *         required: true
 *       - name: Agreement_Doc
 *         description: Limited Partner investment Agreement
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: investment Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/investment_in_lp',api.investment_in_lp);

/**
 * @swagger
 * /invoke/updateLP:
 *   post:
 *     tags:
 *       - updateLP 
 *     description: Update partnership detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: LP_Id
 *         description: Limited Partner ID
 *         in: formData
 *         required: true
 *       - name: FirstName
 *         description: Limited Partner FirstName
 *         in: formData
 *         required: false
 *       - name: LastName
 *         description: Limited Partner LastName
 *         in: formData
 *         required: false
 *       - name: Email
 *         description: Limited Partner Email
 *         in: formData
 *         required: false
 *       - name: Status
 *         description: Limited Partner Status
 *         in: formData
 *         required: false
 *       - name: Partnership_Since
 *         description: Limited Partner Since
 *         in: formData
 *         required: false
 *       - name: Preferred_Return
 *         description: Limited Partner Preferred Return
 *         in: formData
 *         required: false
 *       - name: Catch_Up
 *         description: Limited Partner Catch up
 *         in: formData
 *         required: false
 *       - name: Carried_Interest
 *         description: Limited Partner Carried Interest
 *         in: formData
 *         required: false
 *       - name: IRR
 *         description: Limited Partner IRR
 *         in: formData
 *         required: false
 *       - name: Next_Carried_Interest
 *         description: Limited Partner Next Carried Interest
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: partnership Updated  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/updateLP',api.updateLP);

/**
 * @swagger
 * /invoke/deleteLP:
 *   post:
 *     tags:
 *       - deleteLP 
 *     description: delete lp detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: LP_Id
 *         description: Limited Partner ID
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: delete lp Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/deleteLP',api.deleteLP); 


 
/**
 * @swagger
 * /invoke/addAsset:
 *   post:
 *     tags:
 *       - addAsset 
 *     description: add Asset detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: Asset_Code
 *         description: Asset ID
 *         in: formData
 *         required: true
 *       - name: Asset_Name
 *         description: Asset Name
 *         in: formData
 *         required: false
 *       - name: Type
 *         description: Asset Type
 *         in: formData
 *         required: false
 *       - name: Address
 *         description: Asset Address
 *         in: formData
 *         required: false
 *       - name: City
 *         description: Asset City
 *         in: formData
 *         required: false
 *       - name: State
 *         description: Asset State
 *         in: formData
 *         required: false
 *       - name: Country
 *         description: Asset Country
 *         in: formData
 *         required: false
 *       - name: Area
 *         description: Asset Area
 *         in: formData
 *         required: false
 *       - name: Occupancy
 *         description: Asset Occupancy
 *         in: formData
 *         required: false
 *       - name: Occupancy_Holding_Date
 *         description: Asset Occupancy Holding Date
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Asset add  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/addAsset',api.addAsset);
 
/**
 * @swagger
 * /invoke/updateAsset:
 *   post:
 *     tags:
 *       - updateAsset 
 *     description: Update Asset detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: Asset_Code
 *         description: Asset ID
 *         in: formData
 *         required: true
 *       - name: Asset_Name
 *         description: Asset Name
 *         in: formData
 *         required: false
 *       - name: Type
 *         description: Asset Type
 *         in: formData
 *         required: false
 *       - name: Address
 *         description: Asset Address
 *         in: formData
 *         required: false
 *       - name: City
 *         description: Asset City
 *         in: formData
 *         required: false
 *       - name: State
 *         description: Asset State
 *         in: formData
 *         required: false
 *       - name: Country
 *         description: Asset Country
 *         in: formData
 *         required: false
 *       - name: Area
 *         description: Asset Area
 *         in: formData
 *         required: false
 *       - name: Occupancy
 *         description: Asset Occupancy
 *         in: formData
 *         required: false
 *       - name: Occupancy_Holding_Date
 *         description: Asset Occupancy Holding Date
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Asset Updated  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/updateAsset',api.updateAsset);
 



/**
 * @swagger
 * /invoke/addAssetDoc:
 *   post:
 *     tags:
 *       - addAssetDoc 
 *     description: add Asset document detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: Asset_Code
 *         description: Asset ID
 *         in: formData
 *         required: true
 *       - name: documentId
 *         description: Asset Document ID
 *         in: formData
 *         required: true
 *       - name: documentName
 *         description: Asset Document Name
 *         in: formData
 *         required: false
 *       - name: Document_For
 *         description: Asset Document For
 *         in: formData
 *         required: false
 *       - name: documentFreq
 *         description: Asset Document freq
 *         in: formData
 *         required: false
 *       - name: documentType
 *         description: Asset Document Type
 *         in: formData
 *         required: false
 *       - name: uploadedOn
 *         description: Asset Document UploadedOn
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Asset document add  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/addAssetDoc',api.addAssetDoc);

/**
 * @swagger
 * /invoke/updateAssetDoc:
 *   post:
 *     tags:
 *       - updateAssetDoc 
 *     description: add Asset document detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: Asset_Code
 *         description: Asset ID
 *         in: formData
 *         required: true
 *       - name: documentId
 *         description: Asset Document ID
 *         in: formData
 *         required: true
 *       - name: documentName
 *         description: Asset Document Name
 *         in: formData
 *         required: false
 *       - name: Document_For
 *         description: Asset Document For
 *         in: formData
 *         required: false
 *       - name: documentFreq
 *         description: Asset Document freq
 *         in: formData
 *         required: false
 *       - name: documentType
 *         description: Asset Document Type
 *         in: formData
 *         required: false
 *       - name: uploadedOn
 *         description: Asset Document UploadedOn
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Asset document update  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/updateAssetDoc',api.updateAssetDoc);  




/**
 * @swagger
 * /invoke/addAssetTenant:
 *   post:
 *     tags:
 *       - addAssetTenant 
 *     description: add Asset Tenant detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: Asset_Code
 *         description: Asset ID
 *         in: formData
 *         required: true
 *       - name: Tenant_Id
 *         description: Asset Tenant Id
 *         in: formData
 *         required: true
 *       - name: Tenant_Name
 *         description: Asset Tenant Name
 *         in: formData
 *         required: false
 *       - name: Tenant_Since
 *         description: Asset Tenant Since
 *         in: formData
 *         required: false
 *       - name: Agreement_Upto
 *         description: Asset Tenant Agreement Upto
 *         in: formData
 *         required: false
 *       - name: Agreement_Type
 *         description: Asset Tenant Agreement Type
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Asset Document add  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/addAssetTenant',api.addAssetTenant);
/**
 * @swagger
 * /invoke/updateAssetTenant:
 *   post:
 *     tags:
 *       - updateAssetTenant 
 *     description: add Asset Tenant detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: Asset_Code
 *         description: Asset ID
 *         in: formData
 *         required: true
 *       - name: Tenant_Id
 *         description: Asset Tenant Id
 *         in: formData
 *         required: true
 *       - name: Tenant_Name
 *         description: Asset Tenant Name
 *         in: formData
 *         required: false
 *       - name: Tenant_Since
 *         description: Asset Tenant Since
 *         in: formData
 *         required: false
 *       - name: Agreement_Upto
 *         description: Asset Tenant Agreement Upto
 *         in: formData
 *         required: false
 *       - name: Agreement_Type
 *         description: Asset Tenant Agreement Type
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Asset Tenant update Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/updateAssetTenant',api.updateAssetTenant); 

 
 
 
 /**
  * @swagger
  * /invoke/addPartnershipDoc:
  *   post:
  *     tags:
  *       - addPartnershipDoc 
  *     description: add partnership document detail 
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: Partnership_ID
  *         description: Partnership ID
  *         in: formData
  *         required: true
 *       - name: docId
 *         description: Partnership Document ID
 *         in: formData
 *         required: true
 *       - name: docName
 *         description: Partnership Document Name
 *         in: formData
 *         required: false
 *       - name: docFor
 *         description: Partnership Document For
 *         in: formData
 *         required: false
 *       - name: docFreq
 *         description: Partnership Document Frequency
 *         in: formData
 *         required: false
 *       - name: docType
 *         description: Partnership Document Type
 *         in: formData
 *         required: false
 *       - name: UploadedOn
 *         description: Partnership Document UploadedOn
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: partnership Updated  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
  */
 router.post ('/addPartnershipDoc',api.addPartnershipDoc);

/**
 * @swagger
 * /invoke/UpdatePartnershipDoc:
 *   post:
 *     tags:
 *       - UpdatePartnershipDoc 
 *     description: update partnership document detail 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Partnership_ID
 *         description: Partnership ID
 *         in: formData
 *         required: true
 *       - name: docId
 *         description: Partnership Document ID
 *         in: formData
 *         required: true
 *       - name: docName
 *         description: Partnership Document Name
 *         in: formData
 *         required: false
 *       - name: docFor
 *         description: Partnership Document For
 *         in: formData
 *         required: false
 *       - name: docFreq
 *         description: Partnership Document Frequency
 *         in: formData
 *         required: false
 *       - name: docType
 *         description: Partnership Document Type
 *         in: formData
 *         required: false
 *       - name: UploadedOn
 *         description: Partnership Document UploadedOn
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: partnership Updated  Successfully!
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
 router.post ('/UpdatePartnershipDoc',api.UpdatePartnershipDoc);

 
 module.exports = router; 
 
 
 

 