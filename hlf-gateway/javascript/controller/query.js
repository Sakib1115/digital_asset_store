/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const config = require("../config/hlf_network.json")

const connectionProfilePath = config.connectionProfilePath;
const walletDirPath = config.walletPath;
const appUser=config.appUser;
const channelName=config.channel;
const chaincodeName = config.chaincode;

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(connectionProfilePath);
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));


var queryPartner= async function queryPartner(req,res){
    try {
        // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(decoded.data);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+decoded.data+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);
    console.log("111111111");
    await gateway.connect(ccp, { wallet, identity:decoded.data, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

            // Get the contract from the network.
            const contract = network.getContract(chaincodeName);


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            var data =[]
           
            if(req.body.Partnership_ID && req.body.ID){
                var result1 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
                    var DATA=JSON.parse(result1)
                    if (DATA.Gp.ID !== req.body.ID){
                        return res.status(400).send({'result': `Transaction has been evaluated, result is`,data : `gpId not exist in this partnership`});  
                    }
                    else{
                        data=DATA;
                    }
            }else if(req.body.ID){
                var result = await contract.evaluateTransaction("queryAllPartner");

                for (var i=0; i< JSON.parse(result).length ; i++ ){
                    var array=JSON.parse(result)[i] 
                    
                    //?JSON.parse(result)[i].Record : {} 
                    console.log("array",JSON.parse(result)[i]);
                    if(array.Record.Gp){
                        if(array){
                            if(array.Record.Gp.ID === req.body.ID){
                                data.push(array)
                                // console.log("data",data);
                            }
                        }
                    }
                }
            }else if(req.body.Partnership_ID){
                // console.log("req.body.Partnership_ID",req.body.Partnership_ID);
                var result1 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
                console.log("result1",result1);
                var DATA=JSON.parse(result1)
                data = DATA
            }else{
                var result2 = await contract.evaluateTransaction("queryAllPartner");
                data=JSON.parse(result2)


            }
            // console.log(req.body.gpId == JSON.parse(result).gpId);
       
            // if (req.body.gpId !== JSON.parse(result).gpId){
                   
            //     return res.status(500).send({'result': `gpId not matched, with Patnership Id`});  
            // }
            console.log(`Transaction has been evaluated, result is: ${data}`);
            return res.status(200).send({'result': `Transaction has been evaluated, result is`,data : data});  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});  
    }
}
var queryAllPartner= async function queryAllPartner(req,res){
    try {
        // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(decoded.data);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+decoded.data+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);
    console.log("111111111");
    await gateway.connect(ccp, { wallet, identity: decoded.data, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

            // Get the contract from the network.
            const contract = network.getContract(chaincodeName);


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            console.log("111111111");
            const result = await contract.evaluateTransaction("queryAllPartner");
            console.log("111111wedqwd111");
            // console.log(req.body.gpId == JSON.parse(result).gpId);
       
            // if (req.body.gpId !== JSON.parse(result).gpId){
                   
            //     return res.status(500).send({'result': `gpId not matched, with Patnership Id`});  
            // }
            console.log(`Transaction has been evaluated, result is: ${JSON.parse(result)}`);
            return res.status(200).send({'result': `Transaction has been evaluated, result is`,data : JSON.parse(result)});  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});  
    }
}
var patnershipbyname= async function patnershipbyname(req,res){
    try {
        // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(decoded.data);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+decoded.data+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);
    console.log("111111111");
    await gateway.connect(ccp, { wallet, identity: decoded.data, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

            // Get the contract from the network.
            const contract = network.getContract(chaincodeName);


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            console.log("111111111");
            const result = await contract.evaluateTransaction("queryAllPartner");
            var data= JSON.parse(result)
            var passet = data.find(o => o.Record.Partnership_Name === req.body.Partnership_Name ) 
           console.log("passetujhdiohsdohsdohsdio",passet);
            // console.log(req.body.gpId == JSON.parse(result).gpId);
       
            // if (req.body.gpId !== JSON.parse(result).gpId){
                   
            //     return res.status(500).send({'result': `gpId not matched, with Patnership Id`});  
            // }
            console.log({'result': `Transaction has been evaluated, result is`,data : passet});
            return res.status(200).send({'result': `Transaction has been evaluated, result is`,data : passet});  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});  
    }
}
var getHistoryForId=async function getHistoryForId(req,res){
    try {
              // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(decoded.data);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+decoded.data+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);

    await gateway.connect(ccp, { wallet, identity: decoded.data, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

            // Get the contract from the network.
            const contract = network.getContract(chaincodeName);


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            const result = await contract.evaluateTransaction("getHistoryForId",req.body.Partnership_ID);
            // console.log(req.body.gpId == JSON.parse(result).gpId);
            // console.log("1122",JSON.parse(result));
            // if (req.body.gpId !== JSON.parse(result).gpId){
                   
            //     return res.status(500).send({'result': `gpId not matched, with Patnership Id`});  
            // }

            console.log(`Transaction has been evaluated, result is: ${result}`);
            return res.status(200).send({'result': `Transaction has been evaluated`, data: JSON.parse(result)}); 
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});    
    }
}
var queryForLp= async function queryPartner(req,res){
    try {
        // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(decoded.data);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+decoded.data+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);
    await gateway.connect(ccp, { wallet, identity:decoded.data, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);
            // Get the contract from the network.
            const contract = network.getContract(chaincodeName);
            // const result = await contract.evaluateTransaction("queryAllPartner");
            // console.log("result",JSON.parse(result));
            var Data=[]
            // console.log("LENGTH",JSON.parse(result).length);

            if(req.body.Partnership_ID && req.body.LP_Id){
                var result1 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
                    var DATA=JSON.parse(result1).Lp
                    console.log("DATA",DATA);
                    var array=DATA.find(o => o.LP_Id === req.body.LP_Id)
                    console.log("array",array);
                    if (array){
                        Data=JSON.parse(result1);
                    }else{
                        return res.status(400).send({'result': `Transaction has been evaluated, result is`,data : `LpId not exist in this partnership`});  
                    }
            }else if(req.body.LP_Id){
                const result = await contract.evaluateTransaction("queryAllPartner");
                // console.log("result",JSON.parse(result));
                for (var i=0; i< JSON.parse(result).length ; i++ ){
    
                    var array=JSON.parse(result)[i]   //? JSON.parse(result)[i].Record.Lp : []
                    if (array.Record.Lp) {
                        
                        if(array){
                            var value=array.Record.Lp
                            console.log("value",value);
                            var data=value.find(o => o.LP_Id === req.body.LP_Id)
                            // console.log("final data", data);
                            if(data){
                                Data.push(array)
                            }
                        }
                    } 
                }

            }else if(req.body.Partnership_ID){
                // console.log("req.body.Partnership_ID",req.body.Partnership_ID);
                var result1 = await contract.evaluateTransaction("queryPartner",req.body.Partnership_ID);
                console.log("result1",result1);
                var DATA=JSON.parse(result1)
                Data = DATA
            }else{
                var result2 = await contract.evaluateTransaction("queryAllPartner");
                Data=JSON.parse(result2) 
            }
            console.log(`Transaction has been evaluated, result is: ${Data}`);
            return res.status(200).send({'result': `Transaction has been evaluated, result is`,data : Data});  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});  
    }
}
var querybydate= async function patnershipbyname(req,res){
    try {
        // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(decoded.data);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+decoded.data+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);
    console.log("111111111");
    await gateway.connect(ccp, { wallet, identity: decoded.data, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

            // Get the contract from the network.
            const contract = network.getContract(chaincodeName);


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            console.log("111111111");
            const result = await contract.evaluateTransaction("queryAllPartner");
            var data= JSON.parse(result)
            var passet = data.find(o => o.Record.Partnership_Since === req.body.Partnership_Since ) 
           console.log("passetujhdiohsdohsdohsdio",passet);
            // console.log(req.body.gpId == JSON.parse(result).gpId);
       
            // if (req.body.gpId !== JSON.parse(result).gpId){
                   
            //     return res.status(500).send({'result': `gpId not matched, with Patnership Id`});  
            // }
            console.log({'result': `Transaction has been evaluated, result is`,data : passet});
            return res.status(200).send({'result': `Transaction has been evaluated, result is`,data : passet});  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});  
    }
}


var GpqueryForlp= async function GpqueryForlp(req,res){ 
    try {
        // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(decoded.data);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+decoded.data+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);
    // console.log("111111111");
    await gateway.connect(ccp, { wallet, identity: decoded.data, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

            // Get the contract from the network.
            const contract = network.getContract(chaincodeName);


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            // console.log("111111111");
            const result = await contract.evaluateTransaction("queryAllPartner");
            var data= JSON.parse(result)
            // console.log("111111wedqwd111",data);
            let key = (req.body.gpId).split('gp')
            // console.log("keyldfjlkjh",key);
            // console.log("req.body.gpId",req.body.gpId);
            var passet = data.find(o => o.Key === req.body.gpId ) 
            console.log("passet",passet);
            console.log("passet",passet.Record.lp);
            // console.log(req.body.gpId == JSON.parse(result).gpId);
       
            // if (req.body.gpId !== JSON.parse(result).gpId){
                   
            //     return res.status(500).send({'result': `gpId not matched, with Patnership Id`});  
            // }
            console.log({'result': `Transaction has been evaluated, result is`,data : JSON.parse(result)});
            return res.status(200).send({'result': `Transaction has been evaluated, result is`,data : JSON.parse(result)});  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});  
    }
}
var queryGp= async function queryGp(req,res){
    try {
        // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(decoded.data);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+decoded.data+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);

    await gateway.connect(ccp, { wallet, identity: decoded.data, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("sparx");

            // Get the contract from the network.
            const contract = network.getContract("sparx");


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            const result = await contract.evaluateTransaction("queryGp",req.body.gpId);
            console.log(`Transaction has been evaluated, result is: ${result}`);
            return res.status(200).send({'result': `Transaction has been evaluated, result is: ${result}`});  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});  
    }
}
var getHistoryGpById=async function getHistoryGpById(req,res){
    try {
              // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    var decoded = jwt.verify(req.body.token, secret);
    console.log("decoded=======>>>>>>>",decoded.data)
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(req.body.gpId);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+req.body.gpId+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);

    await gateway.connect(ccp, { wallet, identity: req.body.gpId, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("sparx");

            // Get the contract from the network.
            const contract = network.getContract("sparx");


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            const result = await contract.evaluateTransaction("getHistoryGpById",req.body.gpId);
            console.log(`Transaction has been evaluated, result is: ${result}`);
            return res.status(200).send({'result': `Transaction has been evaluated, result is: ${result}`}); 
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});    
    }
}
var queryLp= async function queryLp(req,res){
    try {
        // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(req.body.lpId);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+req.body.lpId+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);

    await gateway.connect(ccp, { wallet, identity: req.body.lpId, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("sparx1");

            // Get the contract from the network.
            const contract = network.getContract("sparx1");


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            const result = await contract.evaluateTransaction("queryLp",req.body.lpId);
            console.log(`Transaction has been evaluated, result is: ${result}`);
            return res.status(200).send({'result': `Transaction has been evaluated`, data:JSON.parse(result) });  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});  
    }
}
var getHistoryLpById=async function getHistoryLpById(req,res){
    try {
              // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(walletDirPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(req.body.lpId);
    // console.log("identity:", identity);

    if (!identity) {
        console.log('An identity for the '+req.body.lpId+'  does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return res.status(400).send({'result':`user not registered`});
    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    // console.log(`Wallet path: `,gateway,wallet);

    await gateway.connect(ccp, { wallet, identity: req.body.lpId, discovery: { enabled: true, asLocalhost: true } });
    // console.log("ccp*******",ccp);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("sparx1");

            // Get the contract from the network.
            const contract = network.getContract("sparx1");


            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            const result = await contract.evaluateTransaction("getHistoryLpById",req.body.lpId);
            console.log(`Transaction has been evaluated, result is: ${result}`);
            return res.status(200).send({'result': `Transaction has been evaluated, result is: ${result}`}); 
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        return res.status(400).send({'result':`Failed to submit transaction: ${error}`});    
    }
}



module.exports ={    
    queryPartner,
    getHistoryForId,
    queryAllPartner,
    patnershipbyname,
    queryForLp,
    querybydate,
    queryGp,
    getHistoryGpById,
    queryLp,
    getHistoryLpById,
    GpqueryForlp,
}
