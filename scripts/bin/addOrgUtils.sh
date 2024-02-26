# !/bin/bash

#+++++++++++++++++++++++++++++++++++++++++++++++Function+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function fetch_config(){

          echo "fetch config file."
          export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
	  echo "Command:peer channel fetch config ${DIRECTORY_PATH}/${CHANNEL_NAME}_config_block.pb -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} -c ${CHANNEL_NAME} --tls --cafile ${ORDERER_CA}"
          peer channel fetch config ${DIRECTORY_PATH}/${CHANNEL_NAME}_config_block.pb -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} -c ${CHANNEL_NAME} --tls --cafile ${ORDERER_CA}
          rc=$?
          if [[ $rc -ne 0 ]];then
                  echo "channel config not fetch."
         else
                 echo "channel config fetched successfully."
         fi
         return $rc

}

function seperateConfig(){
 jq .data.data[0].payload.data.config ${DIRECTORY_PATH}/${CHANNEL_NAME}_config_block.json > ${DIRECTORY_PATH}/${CHANNEL_NAME}_config.json
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "config seperation failed."
        else
                echo "config seperation successfully done."
        fi
        return $rc

}

function protobufToJson() {
        echo "for convert into json file."
        configtxlator proto_decode --input ${DIRECTORY_PATH}/${CHANNEL_NAME}_config_block.pb --type common.Block --output ${DIRECTORY_PATH}/${CHANNEL_NAME}_config_block.json
        rc=$?
        if [[ $rc -ne 0  ]];then
                echo "config file not converted into json format."
        else
                echo "config file successfully converted into json format."
        fi
        seperateConfig
	rc=$?
        return $rc
}

function newOrg(){
        export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_TX
        org_profile_path=${STG_DIR}/${PROFILE}.json
	rc=$?
	if [[ $rc -ne 0  ]];then
		echo "json file not fetch"
	fi

        configtxgen -printOrg ${PROFILE} > $org_profile_path
	org_config=$(cat $org_profile_path)
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "config transaction generation failed"
        else
                echo "config transaction generated."
        fi


        cat ${DIRECTORY_PATH}/${CHANNEL_NAME}_config.json | jq .channel_group.groups.Application.groups.${MSP_ID}="${org_config}" > ${DIRECTORY_PATH}/${CHANNEL_NAME}_modified_config.json
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "config modification failed"
        else
                echo "config modification successful."
        fi
        return $rc
}


function jsonToProtobuf(){
	input_path=$1
	output_path=$3
	block_type=$2
        configtxlator proto_encode --input ${input_path} --type ${block_type} --output ${output_path}
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "Json to protobuf conversion failed"
        else
                echo "Json to protobuf conversion successful"
        fi
        return $rc

}

function deltaConfig(){
        configtxlator compute_update --channel_id ${CHANNEL_NAME} --original ${DIRECTORY_PATH}/${CHANNEL_NAME}_config.pb --updated ${DIRECTORY_PATH}/${CHANNEL_NAME}_modified_config.pb --output ${DIRECTORY_PATH}/${CHANNEL_NAME}_update.pb
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "Compute delta failed"
        else
                echo "Delta computed successfully"
        fi
        return $rc


}

function editableJSON(){
        configtxlator proto_decode --input ${DIRECTORY_PATH}/${CHANNEL_NAME}_update.pb --type common.ConfigUpdate --output ${DIRECTORY_PATH}/${CHANNEL_NAME}_update.json
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "protobuf to json conversion failed"
        else
                echo "protobuf to json conversion successfully"
        fi
        return $rc

}
function envelopeMSG(){
        echo '{"payload":{"header":{"channel_header":{"channel_id":"'${CHANNEL_NAME}'", "type":2}},"data":{"config_update":'$(cat ${DIRECTORY_PATH}/${CHANNEL_NAME}_update.json)'}}}' | jq . > ${DIRECTORY_PATH}/${CHANNEL_NAME}_update_in_envelope.json
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "envelopMSG updation failed"
        else
                echo "envelopMSG update successfully"
        fi
        return $rc
}
function signConfigtxAsPeerOrg(){

        peer channel signconfigtx -f ${DIRECTORY_PATH}/${CHANNEL_NAME}_update_in_envelope.pb
        rc=$?
        if [[ $rc -ne 0  ]];then
                echo "signconfig to envelope failed"
        else
                echo "signconfig to envelope successful."
        fi
        return $rc
}

function channelUpdate(){
        export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER
        #configtxlator proto_encode --input ${DIRECTORY_PATH}/${CHANNEL_NAME}_update_in_envelope.json --type common.Envelope --output ${DIRECTORY_PATH}/${CHANNEL_NAME}_update_in_envelope.pb
	jsonToProtobuf "${DIRECTORY_PATH}/${CHANNEL_NAME}_update_in_envelope.json" "common.Envelope" "${DIRECTORY_PATH}/${CHANNEL_NAME}_update_in_envelope.pb"
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "channel update conversion failed"
               
        else
                echo "channel update conversion successfully"
        fi
        echo "Command:peer channel update -f ${DIRECTORY_PATH}/${CHANNEL_NAME}_update_in_envelope.pb -c ${CHANNEL_NAME} -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME}  --tls --cafile ${ORDERER_CA}"
        peer channel update -f ${DIRECTORY_PATH}/${CHANNEL_NAME}_update_in_envelope.pb -c ${CHANNEL_NAME} -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME}  --tls --cafile ${ORDERER_CA}
        rc=$?
        if [[ $rc -ne 0 ]];then
                echo "channel update conversion failed"
        else
                echo "channel update conversion successfully"
        fi
        return $rc

}

function printHelp (){
 echo " Usage: 
  addOrgAppChannel <Mode> [Flags]
    Modes:
      fetch_config - this is for to fetch config file.
      protobufToJson - this is for to convert config file to json file.


    Flags:
    Used with modes:
    -c <channel name> - flag for Name of channel
    -f <path>  - flag for config file path
    -b <output path> - flag for output directory path
    -p <profile> - flag for profile 
    -s <stg directory> - flag for stg directory path
    -m <msp id> - flag for msp id."
}



#++++++++++++++++++++++++++++++++++++++++++++++++++++Execute++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
                 -c)
                         CHANNEL_NAME=$2
                         shift
                         ;;
                 -f)
                         ADD_NETWORK_CFG=$2
                         shift
                         ;;
                 -b)
                         DIRECTORY_PATH=$2
                         shift
                         ;;
		 -p)
			 PROFILE=$2
			 shift
			 ;;
		 -s)
			 STG_DIR=$2
			 shift
			 ;;
		 -m)
			 MSP_ID=$2
			 shift 
			 ;;
                 *)
                         echo "Invalid argument passed $1"
                         exit 1
                         ;;
        esac
        shift
done
. $ADD_NETWORK_CFG
if [[ ! -e $ADD_NETWORK_CFG ]];then
        echo "config file not exist."
	exit 1
fi


if [[ $MODE == "fetch_config" ]];then
        fetch_config
        rc=$?
elif [[ $MODE == "protobufToJson" ]];then
        protobufToJson
        rc=$?
elif [[ $MODE == "newOrg" ]];then
        newOrg
        rc=$?
elif [[ $MODE == "jsontoPhotobuf" ]];then
        jsontoPhotobuf
        rc=$?
elif [[ $MODE == "jsonToPhotobuf" ]];then
        jsonToPhotobuf
        rc=$?
elif [[ $MODE == "deltaConfig" ]];then
        deltaConfig
        rc=$?
elif [[ $MODE == "editableJSON" ]];then
        editableJSON
        rc=$?
elif [[ $MODE == "envelopeMSG" ]];then
        envelopeMSG
        rc=$?
elif [[ $MODE == "channelUpdate" ]];then
        channelUpdate
        rc=$?
elif [[ $MODE == "signConfigtxAsPeerOrg" ]];then
        signConfigtxAsPeerOrg
        rc=$?
else
	echo "pass correct arguments."
fi
exit $rc


