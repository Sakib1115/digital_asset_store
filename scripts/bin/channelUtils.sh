#/bin/bash
# This script performs below operations
# 1. Create channel transaction request file (createChannelTx)
# 2. Sign create channel transaction request (signChannelTx)
# 3. Create Channel (createChannel)
# 4. Join channel  (joinChannel)
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Functions +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function createChannelTx() {
	export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_TX
	configtxgen -profile ${PROFILE} -outputCreateChannelTx ${TX_PATH} -channelID $CHANNEL_NAME
	rc=$?

	if [[ $rc -ne 0 ]];then
		echo "Channel transaction file creation failed"
	else 
		echo "Channel transaction file created successfully"
	fi	
	return $rc
}

function createChannel(){
	export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
	echo "Creating channel $CHANNEL_NAME"
	 mkdir -p ${DIRECTORY_PATH}
        peer channel create -o ${ORDERER_HOST} -c $CHANNEL_NAME --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} -f ${TX_PATH}  --outputBlock ${DIRECTORY_PATH}/${CHANNEL_NAME}.block --tls --cafile ${ORDERER_CA}
	rc=$?
	if [[ $rc -ne 0 ]];then
                echo "Channel creation failed"
        else
                echo  "Channel created successfully"
        fi
        return $rc

}
function signtxChannel(){
        echo "Sign channel Tx ${TX_PATH} for channel $CHANNEL_NAME"
	 export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
         peer channel signconfigtx -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} -f ${TX_PATH}   --tls --cafile ${ORDERER_CA}
	rc=$?

        if [[ $rc -ne 0 ]];then
                echo "Failed to sign channel transaction"
        else
                echo "Signed create channel transaction successfully"
        fi
        return $rc

}

function joinChannel(){
        export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
        echo "joining channel $CHANNEL_NAME"
#	mkdir -p ${DIRECTORY_PATH}
	rc=$?
        if [[ $rc -ne 0 ]];then
                 echo "Couldn't create directory ${DIRECTORY_PATH}"
                 return $rc
        fi
        peer channel fetch 0 ${DIRECTORY_PATH}/${CHANNEL_NAME}_channel.block -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} -c $CHANNEL_NAME --tls --cafile ${ORDERER_CA}
	rc=$?
	if [[ $rc -ne 0 ]];then
		 echo "Failed to fetch config block for channel ${CHANNEL_NAME}"
	else 
		echo "fetch config block for channel ${CHANNEL_NAME} successfully."
		
	fi



        peer channel join -b ${DIRECTORY_PATH}/${CHANNEL_NAME}_channel.block
	rc=$?

        if [[ $rc -ne 0 ]];then
                echo "Channel joined failed"
        else
                echo "Channel join successfully"
        fi
        return $rc


}

function printHelp (){
echo " Usage: 
  channelUtils.sh <Mode> [Flags]
    Modes:
      createChannelTx - Create a transaction file for channel  
      signChannelTx -  Sign transaction file for channel
      createChannel - Create a channel 
      joinChannel - join a channel

    Flags:
    Used with modes:
    -n <channel name> - Name of channel to create
    -f <config file> - Path of config file
    -b <output path> - path for to save the output
    -t <transaction path> - transaction file path 
    -p <profile name> -Name of profile."
}

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Execute +++++++++++++++++++++++++++++++++++++++++++++++++
## Parse mode
if [[ $# -lt 1 ]] ; then
  printHelp
  exit 0
else
  MODE=$1
  shift
fi

while [[ $# -gt 1 ]] ; do
case $1 in
        -n)
        CHANNEL_NAME=$2
        if  [[ "$CHANNEL_NAME" =~ [^a-z0-9\ ] ]]; then
                echo "Invalid channel name $2"
                exit 1

        fi

        shift
        ;;
        -f)
        CHANNEL_CFG=$2
        shift
        ;;
        -b)
        DIRECTORY_PATH=$2
        shift
        ;;
        -t)
        TX_PATH=$2
        shift
        ;;
        -p)
        PROFILE=$2
        shift
        ;;
        * )
         echo "Invalid argument passed $1"
	 printHelp
         exit 1
         ;;

esac
shift
done

if [[ $MODE == "createChannelTx" ]];then
        if [[ -z $CHANNEL_CFG || -z $TX_PATH || -z $CHANNEL_NAME || -z $PROFILE ]];then
                echo "Missing mandatory arguments. Please pass -f  -t  -n -p"
                exit 1
        fi
fi


if [[ $MODE == "signChannelTx" ]];then
        if [[ -z $CHANNEL_CFG || -z $TX_PATH || -z $CHANNEL_NAME ]];then
                echo "Missing mandatory arguments. Please pass -f  -t  -n"
                exit 1
        fi
fi


if [[ $MODE == "createChannel" ]];then
        if [[ -z $CHANNEL_CFG || -z $TX_PATH || -z $CHANNEL_NAME || -z $DIRECTORY_PATH ]];then
                echo "Missing mandatory arguments. Please pass -f  -t  -n -b"
                exit 1
        fi
fi


if [[ $MODE == "joinChannel" ]];then
        if [[ -z $CHANNEL_CFG || -z $DIRECTORY_PATH || -z $CHANNEL_NAME ]];then
                echo "Missing mandatory arguments. Please pass -f  -b  -n"
                exit 1
        fi
fi

. $CHANNEL_CFG
if  [[ ! -e $CHANNEL_CFG ]];then
        echo "config file not exist."
	exit 1
fi


if [[ $MODE == "createChannel" ]];then
	createChannel
	rc=$?
elif [[ $MODE == "createChannelTx" ]];then
	createChannelTx
	rc=$?
elif [[ $MODE == "signChannelTx" ]];then
        signtxChannel
	rc=$?
elif [[ $MODE == "joinChannel" ]];then
        joinChannel
         rc=$?
else
	echo "enter a valid argument."
	exit 1	

fi
exit $rc
