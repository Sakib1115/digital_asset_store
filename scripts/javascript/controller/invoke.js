
/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const util = require('util')
const config = require("../config/hlf_network.json")
const connectionProfilePath = config.connectionProfilePath;
const walletDirPath = config.walletPath;
const appUser=config.appUser;
const register= require("./registerUser")
const channelName=config.channel;
const chaincodeName = config.chaincode;
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(connectionProfilePath);
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

var createPartnership = async function createPartnership(req,res){
    try {
        let datas = {
            "Partnership_ID": req.body.Partnership_ID,
            "Partnership_Code":req.body.Partnership_Code,
            "Partnership_Name": req.body.Partnership_Name,
            "Partnership_Since":req.body.Partnership_Since,
            "Partnership_Value":"0",
            "Partnership_Summary":req.body.Partnership_Summary,
            "IsActive":req.body.IsActive,    
            "Gp": {
               "ID": req.body.ID,
                "Firstname":req.body.Firstname,
                "Email":req.body.Email,
                "Lastname":req.body.Lastname,
                "Type":"General Partner"
            },
            "Am":{
                  "ID":req.body.AMID,
                  "FirstName": req.body.FirstName,
                  "LastName":req.body.LastName,
                  "Email":req.body.AMEmail,
                  "Type":"Account Manager"
                   
            },
            "Lp":{
                  "LP_Id":req.body.LP_Id,
                  "Partnership_ID":req.body.Partnership_ID,
                  "FirstName":req.body.FirstNameLP,
                  "LastName":req.body.LastNameLP,
                  "Email":req.body.Email,
                  "Status":req.body.Status,
                  "Partnership_Since":req.body.LPPartnership_Since,
                  "Preferred_Return":req.body.Preferred_Return,
                  "Catch_Up":req.body.Catch_Up,
                  "Carried_Interest":req.body.Carried_Interest,
                  "IRR":req.body.IRR,
                  "Next_Carried_Interest":req.body.Next_Carried_Interest,
                  "Type":"Limited Partner",
                  "Investments":{
                      "InvestmentID":req.body.InvestmentID,
                      "Amount":req.body.Amount,
                      "Agreement_Doc":req.body.Agreement_Doc,
                  }

            },
            "Doc":{
                "Document_Id":req.body.docId,
                "Document_Name":req.body.docName,
                "Document_For":req.body.docFor,
                "Document_Frequency":req.body.docFreq,
                "Document_Type":req.body.docType,
                "Uploaded_On":req.body.UploadedOn
                
            },
            "Asset":{
                "Asset_Code":req.body.Asset_Code,
                "Asset_Name":req.body.Asset_Name,
                "Type":req.body.assetType,
                "Address":req.body.Address,
                "City":req.body.City,
                "State":req.body.State,
                "Country":req.body.Country,
                "Area":req.body.Area,
                "Occupancy_Holding_Date":req.body.Occupancy_Holding_Date,
                "Partnership_ID":req.body.Partnership_ID,
                "Td":{
                   "Asset_Code":req.body.Asset_Code,
                   "Tenant_Id":req.body.Tenant_Id,
                   "Tenant_Name":req.body.Tenant_Name,
                   "Tenant_Since":req.body.Tenant_Since,
                   "Agreement_Upto":req.body.Agreement_Upto,
                   "Agreement_Type":req.body.Agreement_Type
                },
                "Doc":{
                        "Document_Id":req.body.documentId,
                        "Document_Name":req.body.documentName,
                        "Document_For":req.body.Document_For,
                        "Document_Frequency":req.body.documentFreq,
                        "Document_Type":req.body.documentType,
                        "Uploaded_On":req.body.uploadedOn
                
                }
            }
          }
            //  await register.registerUserApi(datas.Gp.ID)
             const walletPath = path.resolve(walletDirPath);
             const wallet = await Wallets.newFileSystemWallet(walletPath);
             // console.log(`Wallet path: ${walletPath}`);
             const identity = await wallet.get('admin');
            //  console.log("datas.Gp.ID",datas.Gp.ID);
             if (!identity) {
                 console.log('An identity for the user does not exist in the wallet');
                //  console.log('Run the registerUser.js application before retrying');
                 return res.status(400).send({ 'result': `admin not registered` });
             }
            if (datas.Am != undefined) {
            await register.registerUserApi(datas.Am.ID)
            const AmIdentity = await wallet.get(datas.Am.ID);
            //  console.log("lpIdentity",lpIdentity);
             if (!AmIdentity) {
                 console.log('An identity for the user does not exist in the wallet');
                //  console.log('Run the registerUser.js application before retrying');
                 return res.status(400).send({ 'result': `AM  not registered` });
             }
            }
             const gateway = new Gateway();
     
             // console.log("gateway",gateway);
            await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });

             // Get the network (channel) our contract is deployed to.
             const network = await gateway.getNetwork(channelName);
                
            //   console.log("network",network);
     
             // Get the contract from the network.
             const contract = network.getContract(chaincodeName);

            //  console.log("contract",contract);
             var objGP ={
                "ID":datas.Gp.ID?datas.Gp.ID:"",
                "Firstname":datas.Gp.Firstname?datas.Gp.Firstname:"",
                "Email": datas.Gp.Email?datas.Gp.Email:"",
                "Lastname": datas.Gp.Lastname?datas.Gp.Lastname:"",
                "Type":datas.Gp.Type?datas.Gp.Type:""
            }

           
            var objAM ={
                "ID": datas.Am ?datas.Am.ID:"",
                "FirstName":  datas.Am ?datas.Am.FirstName :"",
                "LastName": datas.Am ? datas.Am.LastName:"" ,
                "Email": datas.Am ?datas.Am.Email:"",
                "Type":datas.Am ?datas.Am.Type:"",
            }

            
            var obj = {
                "Partnership_ID": datas.Partnership_ID?datas.Partnership_ID:"",
                "Partnership_Code": datas.Partnership_Code?datas.Partnership_Code:"",
                "Partnership_Name": datas.Partnership_Name?datas.Partnership_Name:"",
                "Partnership_Since": datas.Partnership_Since?datas.Partnership_Since:"",
                "Partnership_Value": datas.Partnership_Value?datas.Partnership_Value:"",
                "Partnership_Summary": datas.Partnership_Summary?datas.Partnership_Summary:"",       
                "IsActive": datas.IsActive?datas.IsActive:"",   
                "gp":objGP,
                "lp":  [],
                "am":objAM,
                "asset": [],
                "document":[],
            }
             const result = await contract.submitTransaction('createPartnership', JSON.stringify(obj));
             // Disconnect from the gateway.
             const result2 = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
             await gateway.disconnect();
             return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result2)});

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });
 
    }
}
var updatePartnership = async function updatePartnership(req,res){
    try {
        let datas = {
            "Partnership_ID": req.body.Partnership_ID,
            "Partnership_Code":req.body.Partnership_Code,
            "Partnership_Name": req.body.Partnership_Name,
            "Partnership_Since":req.body.Partnership_Since,
            "Partnership_Summary":req.body.Partnership_Summary,
            "IsActive":req.body.IsActive,       
     
          }

        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        console.log("identity",identity);
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
        
        console.log("result1",JSON.parse(result1));

        var obj = {
            "Partnership_ID": JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": datas.Partnership_Name?req.body.Partnership_Name:JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": datas.Partnership_Since?req.body.Partnership_Since:JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value":JSON.parse(result1).Partnership_Value,
            "Partnership_Summary":  req.body.Partnership_Summary?req.body.Partnership_Summary:JSON.parse(result1)["Partnership_Summary"],  
            "IsActive": req.body.IsActive?req.body.IsActive:JSON.parse(result1)["IsActive"],    
            "Gp": JSON.parse(result1)["Gp"],
            "Lp":  JSON.parse(result1)["Lp"],
            "Am":JSON.parse(result1)["Am"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document": JSON.parse(result1)["Document"],
        }

            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}
var addPartnershipDoc = async function updatePartnership(req,res){
    try {
        let datas = {
            "Partnership_ID": req.body.Partnership_ID,
            "Doc":{
                  "Document_Id":req.body.docId?req.body.docId:"",
                  "Document_Name":req.body.docName?req.body.docName:"",
                  "Document_For":req.body.docFor?req.body.docFor:"",
                  "Document_Frequency":req.body.docFreq?req.body.docFreq:"",
                  "Document_Type":req.body.docType?req.body.docType:"",
                  "Uploaded_On":req.body.UploadedOn?req.body.UploadedOn:""
                  
            }
           
          }
            
          
          console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `user not registered` });
        }
        
        const gateway = new Gateway();
        // console.log("1111")
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 

        console.log("result1",JSON.parse(result1));
       
        //document update process
        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document":JSON.parse(result1)["Document"],
            "Am":JSON.parse(result1)["Am"],
            "Gp": JSON.parse(result1)["Gp"],   
        }
        var DATA= JSON.parse(result1)["Document"]
        // console.log("Document",DATA);
        var DATA1=DATA.find(o => o.Document_Id === req.body.docId)
        // console.log("DATA1",DATA1);
        if (!DATA1){
            obj.Document.push(datas.Doc)
        }else{
            return res.status(400).send({ 'result': `Failed to submit transaction`,data:`Document Already Exist` });    
        }
            // console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}
var UpdatePartnershipDoc = async function updatePartnership(req,res){
    try {
        let datas = {
            "Partnership_ID": req.body.Partnership_ID,
            "Doc":{
                  "Document_Id":req.body.docId,
                  "Document_Name":req.body.docName,
                  "Document_For":req.body.docFor,
                  "Document_Frequency":req.body.docFreq,
                  "Document_Type":req.body.docType,
                  "Uploaded_On":req.body.UploadedOn
                  
            },
           
          }
            
          
        //   console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `user not registered` });
        }
        
        const gateway = new Gateway();
        // console.log("1111")
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 

        console.log("result1",JSON.parse(result1));

        var array=JSON.parse(result1).Document
    //   console.log("array",array);
      var data=array.find(o => o.Document_Id === req.body.docId)
      if (!data){
        return res.status(400).send({ 'result': `Transaction has been Failed`,msg:`Documents not exist` });
      }else{
          data["Document_Id"]= data.Document_Id,
          data["Document_Name"]= datas.Doc.Document_Name?datas.Doc.Document_Name:data.Document_Name,
          data["Document_For"]= datas.Doc.Document_For?datas.Doc.Document_For:data.Document_For,
          data["Document_Frequency"]= datas.Doc.Document_Frequency?datas.Doc.Document_Frequency:data.Document_Frequency,
          data["Document_Type"]= datas.Doc.Document_Type?datas.Doc.Document_Type:data.Document_Type,
          data["Uploaded_On"]= datas.Doc.Uploaded_On?datas.Doc.Uploaded_On:data.Uploaded_On
      }   

        //document update process
        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document":array,
            "Am":JSON.parse(result1)["Am"],
            "Gp": JSON.parse(result1)["Gp"],   
        }
            // console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}
var deletePartnership = async function updatePartnership(req,res){
    try {
        let datas = {
            "Partnership_ID": req.body.Partnership_ID     
          }

          
        //   console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        console.log("identity",identity);
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        
        const gateway = new Gateway();
        console.log("1111")
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
        console.log("result1",JSON.parse(result1));

        var obj = {
            "Partnership_ID": req.body.Partnership_ID     
        }

            console.log("obj",obj);
            const result = await contract.submitTransaction('delete', req.body.Partnership_ID);   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',result);
            await gateway.disconnect();
            return res.status(200).send({ 'status': `Transaction has been submitted`,result :result });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}


var addLP = async function updatePartnership(req,res){
    try {
        let datas = {
            "Lp":{
                "LP_Id":req.body.LP_Id,
                "Partnership_ID":req.body.Partnership_ID,
                "FirstName":req.body.FirstName?req.body.FirstName:"",
                "LastName":req.body.LastName?req.body.LastName:"",
                "Email":req.body.Email?req.body.Email:"",
                "Status":req.body.Status?req.body.Status:"",
                "Partnership_Since":req.body.Partnership_Since?req.body.Partnership_Since:"",
                "Preferred_Return":req.body.Preferred_Return?req.body.Preferred_Return:"",
                "Catch_Up":req.body.Catch_Up?req.body.Catch_Up:"",
                "Carried_Interest":req.body.Carried_Interest?req.body.Carried_Interest:"",
                "IRR":req.body.IRR?req.body.IRR:"",
                "Next_Carried_Interest":req.body.Next_Carried_Interest?req.body.Next_Carried_Interest:"",
                "Total_Amount":"0",
                "Type":"Limited Partner",
                "Investments":[]

          },
            
          }
        //   console.log("datas",datas);
        // Create a new file system based w`allet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `user not registered` });
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        console.log("1111")
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",datas.Lp.Partnership_ID);
        let result1=result2; 
   
        console.log("result1",JSON.parse(result1));
        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value":JSON.parse(result1)["Partnership_Value"] ,
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document":JSON.parse(result1)["Document"],
            "Am":JSON.parse(result1)["Am"],
            "Gp": JSON.parse(result1)["Gp"],
            
        }
       var array= JSON.parse(result1)["Lp"]
       var data= array.find(o => o.LP_Id === req.body.LP_Id)
       if (!data){
           obj.Lp.push(datas.Lp)
       }else{
        return res.status(400).send({ 'result': `Transaction has been failed`,msg:`Lp already Exist` }); 
       }
            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            
            await gateway.disconnect();


            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    }  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
        }

}
var updateLP = async function updatePartnership(req,res){
    try {
        let datas = {
            "Lp":{
                "LP_Id":req.body.LP_Id,
                "Partnership_ID":req.body.Partnership_ID,
                "FirstName":req.body.FirstName,
                "LastName":req.body.LastName,
                "Email":req.body.Email,
                "Status":req.body.Status,
                "Partnership_Since":req.body.Partnership_Since,
                // "Agreement_Doc":req.body.Agreement_Doc,
                "Preferred_Return":req.body.Preferred_Return,
                "Catch_Up":req.body.Catch_Up,
                "Carried_Interest":req.body.Carried_Interest,
                "IRR":req.body.IRR,
                "Next_Carried_Interest":req.body.Next_Carried_Interest,
                "Type":"Limited Partner",

          },
            
          }
          console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        
 

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        console.log("1111")
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",datas.Lp.Partnership_ID);
        let result1=result2; 
       
        console.log("result1",JSON.parse(result1));
       
      var array=JSON.parse(result1).Lp
      if (!array){
        return res.status(400).send({ 'result': `Transaction has been submitted`,msg:`LP data not exist` });
      }else{
          console.log("array",array);
          var data=array.find(o => o.LP_Id === req.body.LP_Id)
          if (!data){
            return res.status(400).send({ 'result': `Transaction has been submitted`,msg:`LP_ID not exist` });
          }else{
              data["LP_Id"]= data.LP_Id,
              data["Partnership_ID"]= data.Partnership_ID,
              data["FirstName"]= datas.Lp.FirstName?datas.Lp.FirstName:data.FirstName,
              data["LastName"]= datas.Lp.LastName?datas.Lp.LastName:data.LastName,
              data["Email"]= datas.Lp.Email?datas.Lp.Email:data.Email,
              data["Status"]= datas.Lp.Status?datas.Lp.Status:data.Status,
              data["Partnership_Since"]= datas.Lp.Partnership_Since?datas.Lp.Partnership_Since:data.Partnership_Since,
              data["Preferred_Return"]= datas.Lp.Preferred_Return?datas.Lp.Preferred_Return:data.Preferred_Return,
              data["Catch_Up"]= datas.Lp.Catch_Up?datas.Lp.Catch_Up:data.Catch_Up,
              data["Carried_Interest"]= datas.Lp.Carried_Interest?datas.Lp.Carried_Interest:data.Lp.Carried_Interest,
              data["IRR"]= datas.Lp.IRR?datas.Lp.IRR:data.IRR,
              data["Next_Carried_Interest"]= datas.Lp.Next_Carried_Interest?datas.Lp.Next_Carried_Interest:data.Carried_Interest,
              data["Total_Amount"]=data.Total_Amount,
              data["Investments"]=data.Investments,
              data["Type"]=data.Type
          }    
      }
            var obj = {
            "Partnership_ID": JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"] ,
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],  
            "IsActive":JSON.parse(result1)["IsActive"],    
            "Gp": JSON.parse(result1)["Gp"],
            "Lp":  array,
            "Am":JSON.parse(result1)["Am"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document": JSON.parse(result1)["Document"],
        }
       
            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}
var investment_in_lp = async function updatePartnership(req,res){
    try {
        let datas = {
            "Lp":{
                "LP_Id":req.body.LP_Id,
                "Partnership_ID":req.body.Partnership_ID,
                "InvestmentID":req.body.InvestmentID,
                "Amount":req.body.Amount,
                "Agreement_Doc":req.body.Agreement_Doc?req.body.Agreement_Doc:"",
          },
            
          }
          console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        
 

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        console.log("1111")
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",datas.Lp.Partnership_ID);
        let result1=result2; 
       var Amount={
             "InvestmentID":req.body.InvestmentID,
             "Amount":req.body.Amount,
             "Agreement_Doc":req.body.Agreement_Doc?req.body.Agreement_Doc:"",
       }

        console.log("result1",JSON.parse(result1));
        var array =JSON.parse(result1).Lp
        if (!array){
            return res.status(400).send({ 'result': `Transaction has been submitted`,msg:`LP data not exist` });
          }else{
              console.log("array",array);
              var data=array.find(o => o.LP_Id === req.body.LP_Id)
              var data2 =Number(datas.Lp.Amount?datas.Lp.Amount:0);
              var array1=data.Investments
              var value=Number(data.Total_Amount)
            console.log("1111",value);
              var Amount1=(value+data2).toString();
              console.log("22222",Amount1);
              data.Total_Amount=Amount1;
              console.log("array1",array1);
              if(array1){
                array1.push(Amount)
              }
          }
            var data1 =Number(JSON.parse(result1).Partnership_Value);
            var  data3 = (data1+data2).toString();   
            var obj = {
            "Partnership_ID": JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": data3,
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],  
            "IsActive":JSON.parse(result1)["IsActive"],    
            "Gp": JSON.parse(result1)["Gp"],
            "Lp":  array,
            "Am":JSON.parse(result1)["Am"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document": JSON.parse(result1)["Document"],
        }
       
            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}
var deleteLP = async function updatePartnership(req,res){
    try {
        let datas = {
            "Gp": {
                "ID": req.body.ID
            },
            "Lp":{
                "LP_Id":req.body.LP_Id,
                "Partnership_ID":req.body.Partnership_ID
          },
            
          }
          console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `user not registered` });
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        console.log("1111")
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",datas.Lp.Partnership_ID);
        let result1=result2; 
      var array=JSON.parse(result1).Lp
      var data=array.find(o => o.LP_Id === req.body.LP_Id)
      if (!data){
          return res.status(400).send({ 'result': `Transaction has been submitted`,msg:`LP not exist` });
        }else{
            var value=Number(data.Total_Amount)
            var value1=Number(JSON.parse(result1).Partnership_Value)
            var value2=(value1-value).toString()
            var totalLp = array.filter(item => item.LP_Id !== req.body.LP_Id);
      }    
        var obj = {
            "Partnership_ID": JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value":value2,
            "Partnership_Summary":  req.body.Partnership_Summary?req.body.Partnership_Summary:JSON.parse(result1)["Partnership_Summary"],  
            "IsActive": req.body.IsActive?req.body.IsActive:JSON.parse(result1)["IsActive"],    
            "Gp": JSON.parse(result1)["Gp"],
            "Lp": totalLp,
            "Am":JSON.parse(result1)["Am"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document": JSON.parse(result1)["Document"],
        }
       
            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}




var addAsset = async function updatePartnership(req,res){
    try {
        let datas = {
            "Asset":{
                "Asset_Code":req.body.Asset_Code,
                "Asset_Name":req.body.Asset_Name?req.body.Asset_Name:"",
                "Type":req.body.Type?req.body.Type:"",
                "Address":req.body.Address?req.body.Address:"",
                "City":req.body.City?req.body.City:"",
                "State":req.body.State?req.body.State:"",
                "Country":req.body.Country?req.body.Country:"",
                "Area":req.body.Area?req.body.Area:"",
                "Occupancy":req.body.Occupancy?req.body.Occupancy:"",
                "Occupancy_Holding_Date":req.body.Occupancy_Holding_Date?req.body.Occupancy_Holding_Date:"",
                "Partnership_ID":req.body.Partnership_ID?req.body.Partnership_ID:"",
                "assetTenant":[],
                "assetDocuments":[]
            },
            
          }
          console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the asset does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        const gateway = new Gateway();

        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
        console.log("result1",JSON.parse(result1));
        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document":JSON.parse(result1)["Document"],
            "Am":JSON.parse(result1)["Am"],
            "Gp": JSON.parse(result1)["Gp"],
            
        }
        obj.Asset.push(datas.Asset)

            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

    }  catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
        }

}
var updateAsset = async function updatePartnership(req,res){
    try {
        let datas = {
            "Asset":{
                "Asset_Code":req.body.Asset_Code,
                "Asset_Name":req.body.Asset_Name,
                "Type":req.body.Type,
                "Address":req.body.Address,
                "City":req.body.City,
                "State":req.body.State,
                "Country":req.body.Country,
                "Area":req.body.Area,
                "Occupancy":req.body.Occupancy,
                "Occupancy_Holding_Date":req.body.Occupancy_Holding_Date,
                "Partnership_ID":req.body.Partnership_ID,
                "assetTenant":[],
                "assetDocuments":[]
            },
        
            
          }
          console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }

        const gateway = new Gateway();
        console.log("1111")
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
       
        console.log("result1",JSON.parse(result1));
    

        var array = JSON.parse(result1).Asset
        var data = array.find(o => o.Asset_Code === req.body.Asset_Code )

     if(!data || data === undefined){
        return res.status(400).send({ 'result': `Transaction has been failed`,msg:`asset id doesnot exist in this partnership` });
    }else{
        data["Asset_Code"] = data.Asset_Code
        data["Asset_Name"] = req.body.Asset_Name?req.body.Asset_Name : data.Asset_Name
        data["Type"] = req.body.Type?req.body.Type : data.Type
        data["Address"] = req.body.Address?req.body.Address : data.Address
        data["City"] = req.body.City?req.body.City : data.City
        data["State"] = req.body.State?req.body.State : data.State
        data["Country"] = req.body.Country?req.body.Country : data.Country
        data["Area"] = req.body.Area?req.body.Area : data.Area
        data["Occupancy"] = req.body.Occupancy?req.body.Occupancy : data.Occupancy
        data["Occupancy_Holding_Date"] = req.body.Occupancy_Holding_Date?req.body.Occupancy_Holding_Date : data.Occupancy_Holding_Date
        data["Partnership_ID"] = req.body.Partnership_ID?req.body.Partnership_ID : data.Partnership_ID
        data["assetDocuments"] =data.assetDocuments
        data["assetTenant"] =data.assetTenant  
    }
    var obj = {
        "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
        "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
        "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
        "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
        "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
        "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
        "IsActive": JSON.parse(result1)["IsActive"],
        "Lp": JSON.parse(result1)["Lp"],
        "Asset": array,
        "Document":JSON.parse(result1)["Document"],
        "Am":JSON.parse(result1)["Am"],
        "Gp": JSON.parse(result1)["Gp"],   
    }
       

            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}




var addAssetDoc = async function updatePartnership(req,res){
    try {
        let datas = {
            "Partnership_ID":req.body.Partnership_ID,
            "Asset_Code":req.body.Asset_Code,
                   "assetDocuments":{
                        "Document_Id":req.body.documentId,
                        "Document_Name":req.body.documentName?req.body.documentName:"",
                        "Document_For":req.body.Document_For?req.body.Document_For:"",
                        "Document_Frequency":req.body.documentFreq?req.body.documentFreq:"",
                        "Document_Type":req.body.documentType?req.body.documentType:"",
                        "Uploaded_On":req.body.uploadedOn?req.body.uploadedOn:""
                 
                   }
           
            
            
          }
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the asset does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        if (req.body.Asset_Code) {
            const lpIdentity1 = await wallet.get(datas.Asset_Code);
            if (!lpIdentity1) {
                console.log('An identity for the asset does not exist in the wallet');
               //  console.log('Run the registerUser.js application before retrying');
                return res.status(400).send({ 'result': `Asset  already exist` });
            }
        }
        const gateway = new Gateway();

        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
       
        console.log("result1",JSON.parse(result1));

        var array=JSON.parse(result1).Asset
        var data1 =array.find(o => o.Asset_Code === req.body.Asset_Code )
        var array1 = data1.assetDocuments
        var data =array1.find(o => o.Document_Id === req.body.documentId )
        if (data ) {
            return res.status(400).send({ 'error': 400,msg:"Document ID Already exist." }) 
        } else {
            array1.push(datas.assetDocuments)
        }

        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset":array,
            "Document":JSON.parse(result1)["Document"],
            "Am":JSON.parse(result1)["Am"],
            "Gp": JSON.parse(result1)["Gp"],   
        }
            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

    }  catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
        }

}
var updateAssetDoc = async function updatePartnership(req,res){
        try {
            let datas = {
                    "Partnership_ID":req.body.Partnership_ID,
                    "Asset_Code":req.body.Asset_Code,
                    "assetDocuments":{
                        "Document_Id":req.body.documentId,
                        "Document_Name":req.body.documentName,
                        "Document_For":req.body.Document_For,
                        "Document_Frequency":req.body.documentFreq,
                        "Document_Type":req.body.documentType,
                        "Uploaded_On":req.body.uploadedOn
                    
                       }
               
                
                
              }
            // Create a new file system based wallet for managing identities.
            const walletPath = path.resolve(walletDirPath);
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            // console.log(`Wallet path: ${walletPath}`);
            
            // Check to see if we've already enrolled the user.
            const identity = await wallet.get('admin');
            if (!identity) {
                console.log('An identity for the asset does not exist in the wallet');
                //  console.log('Run the registerUser.js application before retrying');
                return res.status(400).send({ 'result': `user not registered` });
            }
            if (req.body.Asset_Code) {
                const lpIdentity1 = await wallet.get(datas.Asset_Code);
                if (!lpIdentity1) {
                    console.log('An identity for the asset does not exist in the wallet');
                   //  console.log('Run the registerUser.js application before retrying');
                    return res.status(400).send({ 'result': `Asset  Not exist` });
                }
            }
            const gateway = new Gateway();
    
            await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
            
            const network = await gateway.getNetwork(channelName);
            const contract = network.getContract(chaincodeName);
            const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
            let result1=result2; 
           
            console.log("result1",JSON.parse(result1));
    
            var array=JSON.parse(result1).Asset
            var data1 =array.find(o => o.Asset_Code === req.body.Asset_Code )
            var array1 = data1.assetDocuments
            var data =array1.find(o => o.Document_Id === req.body.documentId )
            if (!data ) {
                return res.status(400).send({ 'error': 400,msg:"Document ID Not exist." }) 
            } else {
                data["Document_Id"]= data.Document_Id,
                data["Document_Name"]= datas.assetDocuments.Document_Name?datas.assetDocuments.Document_Name:data.Document_Name,
                data["Document_For"]= datas.assetDocuments.Document_For?datas.assetDocuments.Document_For:data.Document_For,
                data["Document_Frequency"]= datas.assetDocuments.Document_Frequency?datas.assetDocuments.Document_Frequency:data.Document_Frequency,
                data["Document_Type"]= datas.assetDocuments.Document_Type?datas.assetDocuments.Document_Type:data.Document_Type,
                data["Uploaded_On"]= datas.assetDocuments.Uploaded_On?datas.assetDocuments.Uploaded_On:data.Uploaded_On
            }
    
            var obj = {
                "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
                "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
                "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
                "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
                "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
                "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
                "IsActive": JSON.parse(result1)["IsActive"],
                "Lp": JSON.parse(result1)["Lp"],
                "Asset":array,
                "Document":JSON.parse(result1)["Document"],
                "Am":JSON.parse(result1)["Am"],
                "Gp": JSON.parse(result1)["Gp"],   
            }
                // console.log("obj",obj);
                const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
                // Disconnect from the gateway.
                console.log('Transaction has been submitted',JSON.parse(result));
                await gateway.disconnect();
                return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
        
        
    
        }  catch (error) {
                console.error(`Failed to submit transaction: ${error}`);
                return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
            }
    
}


var addAssetTenant = async function updatePartnership(req,res){
    try {
        let datas = {
            "Partnership_ID":req.body.Partnership_ID,
            "assetTenant":{
                "Asset_Code":req.body.Asset_Code,
                "Tenant_Id":req.body.Tenant_Id,
                "Tenant_Name":req.body.Tenant_Name?req.body.Tenant_Name:"",
                "Tenant_Since":req.body.Tenant_Since?req.body.Tenant_Since:"",
                "Agreement_Upto":req.body.Agreement_Upto?req.body.Agreement_Upto:"",
                "Agreement_Type":req.body.Agreement_Type?req.body.Agreement_Type:""
             }
          }
          console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the asset does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `user not registered` });
        }
       
            const lpIdentity1 = await wallet.get(req.body.Asset_Code);
            if (!lpIdentity1) {
                console.log('An identity for the asset does not exist in the wallet');
               //  console.log('Run the registerUser.js application before retrying');
                return res.status(400).send({ 'result': `Asset not already exist` });
            }
        
        const gateway = new Gateway();

        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
       
        console.log("result1",JSON.parse(result1));
        var array=JSON.parse(result1).Asset
        var data =array.find(o => o.Asset_Code === req.body.Asset_Code )
        if(!data || data == undefined){
            return res.status(400).send({ 'error': 400,msg:"asset not exist in this partnership" }) 
        }
        var array1 = data.assetTenant
        var data1 =array1.find(o => o.Tenant_Id === req.body.Tenant_Id )
        if (data1) {
            return res.status(400).send({ 'error': 400,msg:"Tenant Already exist." }) 
        } else {
            array1.push(datas.assetTenant)
        }

        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": array,
            "Document":JSON.parse(result1)["Document"],
            "Am":JSON.parse(result1)["Am"],
            "Gp": JSON.parse(result1)["Gp"],   
        }
            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

    }  catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
        }

}
var updateAssetTenant = async function updatePartnership(req,res){
    try {
        let datas = {
            "Partnership_ID":req.body.Partnership_ID,
            "assetTenant":{
                "Asset_Code":req.body.Asset_Code,
                "Tenant_Id":req.body.Tenant_Id,
                "Tenant_Name":req.body.Tenant_Name,
                "Tenant_Since":req.body.Tenant_Since,
                "Agreement_Upto":req.body.Agreement_Upto,
                "Agreement_Type":req.body.Agreement_Type
             }
           
            
            
          }
        //   console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the asset does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
       
        const gateway = new Gateway();

        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
       
        console.log("result1",JSON.parse(result1));
        var array=JSON.parse(result1).Asset
        var data =array.find(o => o.Asset_Code === req.body.Asset_Code )
        if (!data || data == undefined){
            return res.status(400).send({ 'error': 400,msg:"assetId not exist in this partnership" }) 
        }
        var array1 = data.assetTenant
        var data1 =array1.find(o => o.Tenant_Id === req.body.Tenant_Id )
        if (!data1) {
            return res.status(400).send({ 'error': 400,msg:"Tenant not exist." }) 
        } else {
            data1["Asset_Code"]= data1.Asset_Code,
            data1["Tenant_Id"]= data1.Tenant_Id,
            data1["Tenant_Name"]=datas.assetTenant.Tenant_Name?datas.assetTenant.Tenant_Name:data1.Tenant_Name,
            data1["Tenant_Since"]= datas.assetTenant.Tenant_Since?datas.assetTenant.Tenant_Since:data1.Tenant_Since,
            data1["Agreement_Upto"]= datas.assetTenant.Agreement_Upto?datas.assetTenant.Agreement_Upto:data1.Agreement_Upto,
            data1["Agreement_Type"]= datas.assetTenant.Agreement_Type?datas.assetTenant.Agreement_Type:data1.Agreement_Type
        }

        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": array,
            "Document":JSON.parse(result1)["Document"],
            "Am":JSON.parse(result1)["Am"],
            "Gp": JSON.parse(result1)["Gp"],   
        }
            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

    }  catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
        }

}



var changeGP = async function updatePartnership(req,res){
    try {
        let datas = {
            "Gp": {
                "ID": req.body.ID,
                "Firstname":req.body.Firstname,
                "Email":req.body.Email,
                "Lastname":req.body.Lastname,
                "Type":"General Partner"
              },
              "Partnership_ID": req.body.Partnership_ID,  
            
            
          }
        //   console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
     
        console.log("result1",JSON.parse(result1));

        var GPOBJ = {
                    "ID":req.body.ID?req.body.ID :JSON.parse(result1).Gp.ID,
                    "Firstname":req.body.Firstname?req.body.Firstname : JSON.parse(result1)["Gp"].Firstname,
                    "Lastname":req.body.Lastname?req.body.Lastname : JSON.parse(result1)["Gp"].Lastname,
                    "Email":req.body.Email?req.body.Email : JSON.parse(result1)["Gp"].Email,
                    "Type":"General Partner"
        }         
      
        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document":JSON.parse(result1)["Document"],
            "Am":JSON.parse(result1)["Am"],
            "Gp": GPOBJ,
            
        }
     

            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}
var changeAM = async function updatePartnership(req,res){
    try {
        let datas = {
            "Am":{
                  "ID":req.body.AMID,
                  "FirstName": req.body.FirstName,
                  "LastName":req.body.LastName,
                  "Email":req.body.Email,
                  "Type":"Account Manager"
            },
            "Partnership_ID": req.body.Partnership_ID,  
          }
          console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        await register.registerUserApi(datas.Am.ID)
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(req.body.AMID);
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `Account Manager not registered` });
        }
        const GPidentity = await wallet.get('admin');
        if (!GPidentity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        const gateway = new Gateway();
        console.log("1111")
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
       
      
        var AMOBJ={
            "ID":req.body.AMID?req.body.AMID :JSON.parse(result1).Am.ID,
            "FirstName": req.body.FirstName?req.body.FirstName : JSON.parse(result1).Am.FirstName,
            "LastName":req.body.LastName?req.body.LastName:JSON.parse(result1).Am.LastName,
            "Email":req.body.Email?req.body.Email : JSON.parse(result1).Am.Email,
            "Type":"Account Manager"
        }
        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document":JSON.parse(result1)["Document"],
            "Am":AMOBJ,
            "Gp": JSON.parse(result1)["Gp"],
            
        }
       

            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}
var updateGP = async function updatePartnership(req,res){
    try {
        let datas = {
            "Gp": {
                "ID": req.body.ID,
                "Firstname":req.body.Firstname,
                "Email":req.body.Email,
                "Lastname":req.body.Lastname,
                "Type":"General Partner"
              },
              "Partnership_ID": req.body.Partnership_ID,  
            
            
          }
        //   console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
     
        console.log("result1",JSON.parse(result1));

        // Get the contract from the network.
        if(JSON.parse(result1).Gp.ID === req.body.ID){
            var GPOBJ = {
                      "ID":JSON.parse(result1).Gp.ID,
                      "Firstname":req.body.Firstname?req.body.Firstname : JSON.parse(result1)["Gp"].Firstname,
                      "Lastname":req.body.Lastname?req.body.Lastname : JSON.parse(result1)["Gp"].Lastname,
                      "Email":req.body.Email?req.body.Email : JSON.parse(result1)["Gp"].Email,
                      "Type":"General Partner"
            }         
        }else{
            return res.status(400).send({ 'result': `Transaction has been failed`,msg:`gp ID not exist in this partnershhip` })
        }
        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document":JSON.parse(result1)["Document"],
            "Am":JSON.parse(result1)["Am"],
            "Gp": GPOBJ,
            
        }
     

            console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}
var updateAM = async function updatePartnership(req,res){
    try {
        let datas = {
            "Am":{
                  "ID":req.body.AMID,
                  "FirstName": req.body.FirstName,
                  "LastName":req.body.LastName,
                  "Email":req.body.Email,
                  "Type":"Account Manager"
            },
            "Partnership_ID": req.body.Partnership_ID,  
          }
        //   console.log("datas",datas);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);
        
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(req.body.AMID);
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `Account Manager not registered` });
        }
        const GPidentity = await wallet.get('admin');
        if (!GPidentity) {
            console.log('An identity for the user does not exist in the wallet');
            //  console.log('Run the registerUser.js application before retrying');
            return res.status(400).send({ 'result': `admin not registered` });
        }
        const gateway = new Gateway();
        
        await gateway.connect(ccp, { wallet, identity:'admin', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result2 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
        let result1=result2; 
       
        // console.log("result1",JSON.parse(result1));
        if(JSON.parse(result1).Am.ID === req.body.AMID){
            var AMOBJ={
                "ID":JSON.parse(result1).Am.ID,
                "FirstName": req.body.FirstName?req.body.FirstName : JSON.parse(result1).Am.FirstName,
                "LastName":req.body.LastName?req.body.LastName:JSON.parse(result1).Am.LastName,
                "Email":req.body.Email?req.body.Email : JSON.parse(result1).Am.Email,
                "Type":"Account Manager"
            }
        }else{
            return res.status(400).send({ 'result': `Transaction has been failed`,msg:`AM ID not exist in this partnershhip` })
        }


        var obj = {
            "Partnership_ID":JSON.parse(result1)["Partnership_ID"],
            "Partnership_Code":JSON.parse(result1)["Partnership_Code"],
            "Partnership_Name": JSON.parse(result1)["Partnership_Name"],
            "Partnership_Since": JSON.parse(result1)["Partnership_Since"],
            "Partnership_Value": JSON.parse(result1)["Partnership_Value"],
            "Partnership_Summary": JSON.parse(result1)["Partnership_Summary"],
            "IsActive": JSON.parse(result1)["IsActive"],
            "Lp": JSON.parse(result1)["Lp"],
            "Asset": JSON.parse(result1)["Asset"],
            "Document":JSON.parse(result1)["Document"],
            "Am":AMOBJ,
            "Gp": JSON.parse(result1)["Gp"],
            
        }
       

            // console.log("obj",obj);
            const result = await contract.submitTransaction('updatePartnership', JSON.stringify(obj));   
            // Disconnect from the gateway.
            console.log('Transaction has been submitted',JSON.parse(result));
            await gateway.disconnect();
            return res.status(200).send({ 'result': `Transaction has been submitted`,msg:JSON.parse(result) });
    
    

}  catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(400).send({ 'result': `Failed to submit transaction: ${error}` });  
    }

}







module.exports = {
    createPartnership,
    updatePartnership,
    addLP,
    updateAM,
    updateLP,
    updateGP,
    updateAsset,
    addAsset,
    addPartnershipDoc,
    addAssetDoc,
    addAssetTenant,
    UpdatePartnershipDoc,
    updateAssetDoc,
    updateAssetTenant,
    deleteLP,
    changeGP,
    changeAM,
    deletePartnership,
    investment_in_lp
}































