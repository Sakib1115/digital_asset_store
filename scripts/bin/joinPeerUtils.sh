#!/bin/bash





function fetch_config(){
          echo "fetch config file for Peer1 of Org1"
export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER

	  peer channel fetch 0  ${DIRECTORY_PATH}/${CHANNEL_NAME}_config_block.block -o ${ORDERER_HOST} --ordererTLSHostnameOverride ${ORDERER_OVERRIDE_HOST_NAME} -c ${CHANNEL_NAME} --tls --cafile ${ORDERER_CA}
	 
	  rc=$?
	  if [[ $rc -ne 0 ]];then
		  echo "Peer config fetching failed."
	  else
		  echo "Peer config fetched successfully."
	  fi
	  return $rc
  }


function joinChannel(){
export FABRIC_CFG_PATH=$FABRIC_CFG_PATH_PEER

	peer channel join -b ${DIRECTORY_PATH}/${CHANNEL_NAME}_config_block.block
	rc=$?
	if [[ $rc -ne 0 ]];then
                  echo "Peer not joined."
             
         else
                 echo "Peer joined successfully."
         fi
         return $rc

}


function printHelp (){
        echo " Usage:
  peer1org1.sh <Mode> [Flags]
    Modes:
      fetch_config - this is for to fetch config file.

    Flags:
    Used with modes:
    -n <channel name> - Name of channe
    -f <path>  - path of config file
    -b <output path> - path for to save file."
}

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
                 -n)
                         CHANNEL_NAME=$2
                         shift
                         ;;
                 -f)
                         PEER1_ORG1_CFG=$2
                         shift
                         ;;
                 -b)
                         DIRECTORY_PATH=$2
                         shift
                         ;;
                 *)
                         echo "unexpected error"
                         exit 1
                         ;;
        esac
        shift
done
. $PEER1_ORG1_CFG
if [[ -e $PEER1_ORG1_CFG ]];then
        echo "config file exist"
else
        echo "config file not exist."
fi


if [[ $MODE == "fetch_config" ]];then
	fetch_config
	rc=$?
elif [[ $MODE == "joinChannel" ]];then
        joinChannel
        rc=$?

fi
exit $rc

