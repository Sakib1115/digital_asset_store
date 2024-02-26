#!/bin/bash

echo "Create genesis block"

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
        PROFILE=$2
        shift
        ;;
        -c)
        CHANNEL_NAME=$2
        shift
        ;;
        -o)
        OUTPUT_PATH=$2
        shift
        ;;
        -f)
        GENESIS_CFG=$2
        shift
        ;;
        -ccp)
        CHANNEL_CREATE_POLICY_JSON=$2
        shift
        ;;
        * )
         echo "unexpected error"
         exit 1
         ;;

esac
shift
done
. $GENESIS_CFG
if  [[ -z $GENESIS_CFG || -z $PROFILE || -z $CHANNEL_NAME || -z $OUTPUT_PATH ]] ; then
        echo "Please provide all the argument Config file, Profile, ChannelId and Output Path."
        exit 1
fi

function generateGenesis(){

        configtxgen -profile $PROFILE -channelID $CHANNEL_NAME -outputBlock $OUTPUT_PATH
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "Genesis Block creation failed."
        else
                echo "Genesis Block creation successful."
        fi

        if [[ ! -z $CHANNEL_CREATE_POLICY_JSON ]];then
                convertGnsBlockToJson $OUTPUT_PATH
                rc=$?
                if [[ $rc -ne 0 ]];then
                echo "Terminating process"
        fi
                updateChannelCreatePolicy
                rc=$?
                if [[ $rc -ne 0 ]];then
                echo "Terminating process"
        fi
                convertJsonToBlock
                rc=$?
                if [[ $rc -ne 0 ]];then
                echo "Terminating process"
        fi

        fi
	return $rc
}


function convertGnsBlockToJson(){
        block_file=$1
        echo "Convert genesis block to json"
        configtxlator proto_decode --input ${block_file} --type common.Block --output $STG_DIR/genesis.json
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "Genesis block to json conversion failed."
               
        else
                echo "Genesis block to json conversion successful."
        fi
	return $rc
}

function updateChannelCreatePolicy(){
        echo "Update ChannelCreationPolicy of genesis json"
        policy=$(cat ${CHANNEL_CREATE_POLICY_JSON})
        cat ${STG_DIR}/genesis.json | jq .data.data[0].payload.data.config.channel_group.groups.Consortiums.groups.${PROFILE}.values.ChannelCreationPolicy.value="${policy}" > ${STG_DIR}/modified_genesis.json
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "Channel creation Policy failed."
        else
                echo "Channel creation Policy successful."
        fi
	return $rc
}

function convertJsonToBlock() {
        echo "Convert genesis json to block"
        configtxlator proto_encode --input ${STG_DIR}/modified_genesis.json --type common.Block --output ${OUTPUT_PATH}
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "Genesis json to block conversion failed."
        else
                echo "Genesis json to block conversion successful."
        fi
	return $rc
}

function printHelp (){
              
		echo "Usage:
		genesisUtils.sh <Mode> [Flags]
		Modes:
		generateGenesis- Generate a Genesis Block
		convertGnsBlockToJson- Convert Genesis Block to JSON
		updateChannelCreatePolicy-Create Channel Create Policy
		convertJsonToBlock- Convert Genesis Json to Block

		Flags:
		Used with modes:
		-n <profile name> - Name of the profile
		-c <channel name> -name of the channel 
		-o <output path>- path to save output
		-f <config file> - Path of config file
		-ccp <channel creation policy> - create channel policy"

}

if [[ $MODE == "generateGenesis" ]];then
        generateGenesis
        rc=$?

fi
exit $rc
