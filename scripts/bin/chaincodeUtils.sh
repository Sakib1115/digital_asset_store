#!/bin/bash
# this script performs below operations
#1. to install chaincode package
#2. to install chaincode 
#3. chainCode install for which channel
#4. to approve any chainCode for commit 
#5. check for organization it's approve or not
#6. to commit chaincode
 
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Functions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function packageChaincode(){

	export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
		echo "Package Chain Code"
		peer lifecycle chaincode package ${CHAIN_CODE_NAME}_${vs}.tar.gz --path ${DIRECTORY_PATH} --lang ${LANGUAGE} --label ${CHAIN_CODE_NAME}_${vs}
		rc=$?
		if [[ $rc -ne 0 ]];then
			echo "Chaincode package failed"
		else
			echo "Packaged chaincode successfully"
		fi
		return $rc

}

function installChaincode(){
                export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER

         	echo "Installing chaincode"
		peer lifecycle chaincode install ${CHAIN_CODE_NAME}_${vs}.tar.gz
		rc=$?

		if [[ $rc -ne 0 ]];then
			echo "Chaincode installation failed"
		else 
			echo "Chaincode installed successfully"
		fi
		return $rc
}
function chainCodeQueryinstalled(){
               export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
		peer lifecycle chaincode queryinstalled
		rc=$?
		if [[ $rc -ne 0 ]];then
			echo "Chaincode query failed."
		else
			echo "ChainCode queryInstalled."
		fi
		return $rc
}
function approveChaincode() {
                  export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
		PACKAGE_ID=$(peer lifecycle chaincode queryinstalled | grep ${CHAIN_CODE_NAME}_${vs} | grep -oP '(?<=Package ID: ).*?(?=,)')
		echo "PackageID: $PACKAGE_ID"
                rc=$?

                if [[ $rc -ne 0 ]];then
                        echo "package id generation failed."
                fi

		export CC_PACKAGE_ID=$PACKAGE_ID


		echo "Command: peer lifecycle chaincode approveformyorg -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} --channelID $CHANNEL_NAME --name $CHAIN_CODE_NAME --version ${vs} --package-id $CC_PACKAGE_ID --sequence ${seq} --tls --cafile ${ORDERER_CA}"


		peer lifecycle chaincode approveformyorg -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} --channelID $CHANNEL_NAME --name $CHAIN_CODE_NAME --version ${vs} --package-id $CC_PACKAGE_ID --sequence ${seq} --tls --cafile ${ORDERER_CA}
		rc=$?

		if [[ $rc -ne 0 ]];then
			echo "Chaincode approval failed."
			exit 1
		else 
			echo "ChainCode approve successfully"
		fi
		return $rc

}
function checkCommitRediness(){
	echo "Checking commit readiness"
	export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
	echo "Command:peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name $CHAIN_CODE_NAME --version ${vs} --sequence ${seq} --tls --cafile $ORDERER_CA"
	peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name $CHAIN_CODE_NAME --version ${vs} --sequence ${seq} --tls --cafile $ORDERER_CA
	rc=$?

	if [[ $rc -ne 0 ]];then
			echo "Could not perform commit readiness check"
	fi
}
			
function commitChaincode(){
		echo "commit chainCode "
	
	 export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER

     CMD="peer lifecycle chaincode commit  -o ${ORDERER_HOST}  --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} --channelID $CHANNEL_NAME --name $CHAIN_CODE_NAME --version ${vs} --sequence ${seq} --tls --cafile $ORDERER_CA"

     cmd_with_tls="$CMD $PEER_TLS_WITH_ROOTFILE"
     $cmd_with_tls
	rc=$?
	
		if [[ $rc -ne 0 ]];then
			echo "chainCode commit failed"
		fi
	
	echo "Chain code status on channel"
	
	peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name $CHAIN_CODE_NAME --cafile $ORDERER_CA
	rc=$?
	
	if [[ $rc -ne 0 ]];then
			echo "Failed to query commited chain code on $CHANNEL_NAME"
	fi
}
function printHelp (){
             echo " Usage: 
  chainCodeUtils.sh <Mode> [Flags]
    Modes:
      chainCodePackageInstall - this is for to install package for chaincode
      ChainCodeInstall -  this is for to install chaincode 
      chainCodeQueryinstalled -  chainCode install for which channel
      approveChaincode - this is for to approve chainCode
      commitChaincode -   this is for to commit chainCode
      checkCommitRediness - this is for to check organization approve or not
    Flags:
    Used with modes:
    -c <channel name> - Name of channel 
    -f <config file> - Path of config file
    -b <output path> - path for to save the output
    -l <language> - this is for language 
    -s <sequence> -this is for sequence
    -v <version> - this is for version
    -n <chaincode name>  - Name of chaincode."
}
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Execute++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
## Parse mode
if [[ $# -lt 1 ]] ; then
  printHelp
  exit 0
else
  MODE=$1
  shift
fi

while [[ $# -gt 0 ]];do
        case $1 in
                 -v)
                         vs=$2
                         shift
                         ;;
                 -c)
                         CHANNEL_NAME=$2
                         shift
                         ;;
                 -f)
                         CHAIN_CODE_CFG=$2
                         shift
                         ;;
                 -n)
                         CHAIN_CODE_NAME=$2
                         shift
                         ;;
                 -b)
                         DIRECTORY_PATH=$2
                         shift
                         ;;
                 -l)
                         LANGUAGE=$2
                         shift
                         ;;
                 -s)
                         seq=$2
                         shift
                         ;;
                 *)
                         echo "Invalid argument passed $1"
                         exit 1
                         ;;
        esac
        shift
done
. $CHAIN_CODE_CFG
if [[ -e $CHAIN_CODE_CFG ]];then
        echo "config file exist"
else
        echo "config file not exist."
fi

if [[ $MODE == "packageChaincode" ]];then
	if [[ -z $vs || -z $DIRECTORY_PATH || -z $LANGUAGE || -z $CHAIN_CODE_CFG || -z $CHAIN_CODE_NAME ]];then
                echo "Missing mandatory arguments. Please pass -f -n -b -l -v"
                exit 1
        fi

elif [[ $MODE == "installChaincode" ]];then
        if [[ -z $CHAIN_CODE_CFG || -z $vs  || -z $CHAIN_CODE_NAME ]];then
                echo "Missing mandatory arguments. Please pass -f -n -v"
                exit 1
        fi

elif [[ $MODE == "chainCodeQueryinstalled" ]];then
        if [[ -z $CHAIN_CODE_CFG  ]];then
                echo "Missing mandatory argument. Please pass -f"
                exit 1
        fi

elif [[ $MODE == "approveChaincode" ]];then
        if [[ -z $CHAIN_CODE_CFG || -z $vs || -z $CHANNEL_NAME || -z $seq  || -z $CHAIN_CODE_NAME ]];then
	#	echo "-f $CHAIN_CODE_CFG -n $vs -s $seq -c $CHANNEL_NAME"
                echo "Missing mandatory arguments. Please pass -f -n -s -c -v"
                exit 1
        fi

elif [[ $MODE == "checkCommitRediness" ]];then
        if [[ -z $CHAIN_CODE_CFG || -z $vs || -z $CHANNEL_NAME || -z $seq || -z $CHAIN_CODE_NAME ]];then
                 echo "Missing mandatory arguments. Please pass -f -n -s -c -v"
                 exit 1
        fi

elif [[ $MODE == "commitChaincode" ]];then
        if [[ -z $CHAIN_CODE_CFG || -z $vs || -z $CHANNEL_NAME || -z $seq || -z $CHAIN_CODE_NAME ]];then
                echo "Missing mandatory arguments. Please pass -f -n -s -c -v"
                exit 1
        fi
fi

if [[ $MODE == "packageChaincode" ]];then
        packageChaincode
        rc=$?
elif [[ $MODE == "installChaincode" ]];then
        installChaincode
        rc=$?
elif [[ $MODE == "chainCodeQueryinstalled" ]];then
        chainCodeQueryinstalled
        rc=$?
elif [[ $MODE == "approveChaincode" ]];then
        approveChaincode
         rc=$?
elif [[ $MODE == "commitChaincode" ]];then
        commitChaincode
         rc=$?
elif [[ $MODE == "checkCommitRediness" ]];then
        checkCommitRediness
         rc=$?

fi
exit $rc

