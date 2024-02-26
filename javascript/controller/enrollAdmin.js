/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const config = require("../config/hlf_network.json")

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');



const connectionProfilePath = config.connectionProfilePath;
const walletDirPath = config.walletPath;

const ccpPath = path.resolve(connectionProfilePath);
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

console.log("controller/enrollAdmin ccp",ccp);
console.log("controller/enrollAdmin ccppath",ccpPath);



var enrollAdminapi=async function enrollAdminapi(req,res) {
    try {
        
        console.log("controller/enrollAdmin")
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca_sparx'];
    console.log("1111>>",caInfo);
        const caTLSCACerts = caInfo.tlsCACerts.path;
        console.log("222>>",caTLSCACerts);
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
        console.log("333>>",ca);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(walletDirPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
        //     return;
       return res.status(200).send({'result':`An identity for the admin user "admin" already exists in the wallet`});
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'SparxMSP',
            type: 'X.509',
        };
        await wallet.put('admin', x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
        return res.status(200).send({'result':`Successfully enrolled admin user "admin" and imported it into the wallet`});
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        return res.status(400).send({'result':`Failed to enroll admin: ${error}`});
    }
}

module.exports = {
    enrollAdminapi
} 
