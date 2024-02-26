#!/bin/bash


	#+++++++++++++++++++++++++++++++++++++++++++++++++++(<function>)+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	function identity(){
        	output=$(fabric-ca-client identity list --caname ${CA_NAME}  --tls.certfiles ${TLS_CERT_PATH}| grep ${ID_NAME})
	rc=$?
	if [[ ! -z ${output} ]];then
        	        echo "${ID_NAME} already registered"
			echo "${output}"
                	rc=$?
        	fi
	return $rc

	}

	function enrollFabicCAClient (){
       	 	echo "Command: fabric-ca-client enroll -u https://${CA_USER}:${CA_PASS}@${CA_HOST} --caname $CA_NAME --tls.certfiles $TLS_CERT_PATH"
        	fabric-ca-client enroll -u https://${CA_USER}:${CA_PASS}@${CA_HOST} --caname $CA_NAME --tls.certfiles $TLS_CERT_PATH
	rc=$?
	if [[ $rc -ne 0 ]];then
        	echo "Enroll Fabric ca client generation failed"
		
	else
        	echo "created successfully"
	fi
	return $rc


	}	

	function generateMsp() {
     	 echo "#################################################### < Generate MSP > ######################################################"

	enrollFabicCAClient
	rc=$?
	identity
	rc=$?
	if [[ $rc -ne 0 ]]; then
		fabric-ca-client register --caname ${CA_NAME} --id.name ${ID_NAME} --id.secret ${ID_SECRET} --id.type ${ID_TYPE} --tls.certfiles $TLS_CERT_PATH
	     rc=$?
	fi
	if [[ $rc -ne 0 ]];then
       	 	echo "MSP Generation failed."
	
	fi



	fabric-ca-client enroll -u https://${ID_NAME}:${ID_SECRET}@${CA_HOST} --caname ${CA_NAME} -M ${OUTPUT_PATH} --tls.certfiles $TLS_CERT_PATH 
	rc=$?
	if [[ $rc -ne 0 ]];then
	        echo "Enrolment failed for ${ID_NAME} of type  ${ID_TYPE}"
	fi

	return $rc
	}


 	function generateTlsCerts() {
      	echo "################################################### <Generate TLS Certificate> #################################################################"


	enrollFabicCAClient
	rc=$?
	
	if [[ $rc -ne 0 ]]; then
                fabric-ca-client register --caname ${CA_NAME} --id.name ${ID_NAME} --id.secret ${ID_SECRET} --id.type ${ID_TYPE} --tls.certfiles $TLS_CERT_PATH
             rc=$?
        fi
        if [[ $rc -ne 0 ]];then
                echo "MSP Generation failed."

        fi
	
      fabric-ca-client enroll -u https://${ID_NAME}:${ID_SECRET}@${CA_HOST} --caname ${CA_NAME} -M ${OUTPUT_PATH} --enrollment.profile tls --csr.hosts ${PEER_HOST} --csr.hosts localhost --tls.certfiles $TLS_CERT_PATH     



	rc=$?
	if [[ $rc -ne 0 ]];then
       	 	echo "TLS Generation failed"
		
	else
        	echo "TLS certificate Generation successfull"
	fi
	return $rc

	}

	function createNodeOUConfig(){

	echo "############################################################# <Generate NodeOU Config> ############################################################"
	mkdir -p $FABRIC_CA_CLIENT_HOME/msp

	echo "NodeOUs:
      Enable: true
      ClientOUIdentifier:
        Certificate: cacerts/localhost-${CA_PORT}-${CA_NAME}.pem
        OrganizationalUnitIdentifier: client
      PeerOUIdentifier:
        Certificate: cacerts/localhost-${CA_PORT}-${CA_NAME}.pem
        OrganizationalUnitIdentifier: peer
      AdminOUIdentifier:
        Certificate: cacerts/localhost-${CA_PORT}-${CA_NAME}.pem
        OrganizationalUnitIdentifier: admin
      OrdererOUIdentifier:
        Certificate: cacerts/localhost-${CA_PORT}-${CA_NAME}.pem
        OrganizationalUnitIdentifier: orderer" > ${OUTPUT_PATH}/config.yaml
		# $FABRIC_CA_CLIENT_HOME/msp/config.yaml
        rc=$?
	if [[ $rc -ne 0 ]];then
        	echo "FABRIC_CA_CLIENT Generation failed"
		
	else
        	echo "Created Node OU Config successfully"
	fi
	    
	    return $rc

	}
	function printHelp(){
		echo "Usage:
    	mspUtils.sh <mode> [flags]
     	identity - check identity register ueser
     	enrollFabicCAClient - created Fabric ca client generation
     	generateMsp - MSP generation
     	generateTlsCerts - TLS Generation
     	createNodeOUConfig -creating Node OU config
     
     	flags:
     	used with mode:
     	-n <CA_NAME> - Name of Certificate
     	-i <ID_NAME> - Id_Name of Certificate
     	-s <ID_SECRET> - password of Certificate
     	-t <ID_TYPE> - Users of Certificate
     	-o <OUTPUT_PATH> - output path of certificate
     	-f <CHANNEL_CFG> - config file of certificate
     	-u <CA_USER> - CA server user name
     	-p <CA_PASS> - CA server password"
	}
	#++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Execute +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	## Parse mode
	if [[ $# -lt 1 ]] ; then
  	printHelp
  	exit 1
	else
  	MODE=$1
  	shift
	fi



	while [[ $# -gt 1 ]] ; do
	case $1 in
        	-n)
        	CA_NAME=$2
        	shift
        	;;
        	-i)
		ID_NAME=$2
		shift
		;;
		-s)
		ID_SECRET=$2
		shift
		;;
		-t)	
		ID_TYPE=$2
		shift
		;;
        	-o)
		OUTPUT_PATH=$2
		shift
		;;
		-f)
		CHANNEL_CFG=$2
		shift
		;;	
		-u)
		CA_USER=$2
		shift
		;;
		-p)
		CA_PASS=$2
		shift
		;;
    	* )
     	echo "Invalid argument provided $1"
	printHelp
     	exit 1
	  ;;

	esac
	shift
	done

	. $CHANNEL_CFG

	if [ -e  $CHANNEL_CFG ]
	then
    		echo "Loading config file $CHANNEL_CFG"
	else
    		echo "config file not exist"
	fi


	if [[ $MODE == "generateMsp" ]];then
        	if [[ -z $CA_NAME || -z $ID_NAME || -z $ID_SECRET || -z $ID_TYPE || -z $OUTPUT_PATH || -z $CHANNEL_CFG || -z $CA_USER || -z $CA_PASS ]] ; then
        	echo "Missing mandatory arguments.please pass -n -i -s -t -o -f -u -p"
        	exit 1

      		fi
	fi        

	if [[ $MODE == "generateTlsCerts" ]];then
        	if [[ -z $CA_NAME || -z $ID_NAME || -z $ID_SECRET || -z $ID_TYPE || -z $OUTPUT_PATH || -z $CHANNEL_CFG || -z $CA_USER || -z $CA_PASS ]] ; then
        	echo "Missing mandatory arguments.please pass -n -i -s -t -o -f -u -p"
        	exit 1

      	fi
	fi 

	if [[ $MODE == "createNodeOUConfig" ]];then
        	if [[ -z $CA_NAME ||-z $OUTPUT_PATH || -z $CHANNEL_CFG ]] ; then
        	echo "Missing mandatory arguments.please pass -n -o -f"
        	exit 1

      		fi
	fi 

	if [[ $MODE == "generateMsp" ]];then
		generateMsp
		frc=$rc
	elif [[ $MODE == "generateTlsCerts" ]];then
		generateTlsCerts
		frc=$rc
	elif [[ $MODE == "createNodeOUConfig" ]];then
		createNodeOUConfig
		frc=$rc	

	fi
	exit $frc
