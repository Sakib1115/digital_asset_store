**Network Scripts**

Scripts present in directory bin are used for building and maintaining Hyperledger Fabric private blockchain network. Config templates present in conf directory can be used for creating configuration files based on environment. Binaries present in binaries directory can be used for running independent services for the network.

Below are the details of scripts and their usage.

1. **Name:** mspUtils.sh

>       Description:- 
>             Used for generating MSP identity,TLS profile and NodeOU config for organization.
>       Usage:-
>            	mspUtils.sh <mode> [flags]
>       Modes:-
>             A. <createNodeOUConfig> - creating Node OU config.
>                ./mspUtils.sh createNodeOUConfig -n <CA_NAME> -f <CONFIG_PATH> -o <OUTPUT_PATH>
>             B. <generateMsp> - MSP generation.
>                ./mspUtils.sh generateMsp -n <CA_NAME> -i <ID_NAME> -s <ID_SECRET> -t peer -f <CONFIG_PATH> -u <CA_USER> -p <CA_PASS> -o <OUTPUT_PATH>
>             C. <generateTlsCerts> - TLS Generation.
>                ./mspUtils.sh generateTlsCerts -n <CA_NAME> -i <ID_NAME> -s <ID_SECRET> -t peer -f <CONFIG_PATH> -u <CA_USER> -p  <CA_PASS> -o <OUTPUT_PATH>
> 
>             identity - check identity register ueser
>             enrollFabicCAClient - created Fabric ca client generation
>             generateMsp - MSP generation
>             generateTlsCerts - TLS Generation
>             createNodeOUConfig -creating Node OU config
>      
>       Flags:-
>          used with mode:-
>             -n <CA_NAME> - Name of Certificate
>             -i <ID_NAME> - Id_Name of Certificate
>             -s <ID_SECRET> - password of Certificate
>             -t <ID_TYPE> - Users of Certificate
>             -o <OUTPUT_PATH> - output path of certificate
>             -f <CHANNEL_CFG> - config file of certificate
>             -u <CA_USER> - CA server user name
>             -p <CA_PASS> - CA server password"

2. **Name**: channelUtils.sh
>       Description:-
>             Used for creating channel on existing network and join peers to a channel.
> 
>       Usage:- 
>             channelUtils.sh <Mode> [Flags]
>       Modes:-
>             A. <createChannelTx> - Create channel transaction request file.
>                ./channelUtils.sh createChannelTx -n <CHANNEL_NAME>  -f <CONFIG_PATH> -t <TRANSACTION_PATH> -p <PROFILE>
>             B. <signtxChannel> - Sign create channel transaction request.
>                ./channelUtils.sh signChannelTx -n <CHANNEL_NAME>  -f <CONFIG_PATH>  -t <TRANSACTION_PATH>
>             c. <createChannel> -  this function for create channel.
>                ./channelUtils.sh createChannel -n <CHANNEL_NAME>  -f <CONFIG_PATH> -t <TRANSACTION_PATH> -b <OUTPUT_PATH>
>             D. <joinChannel> - this function use for to join channel.
>                ./channelUtils.sh joinChannel -n <CHANNEL_NAME>  -f <CONFIG_PATH>  -b <OUTPUT_PATH>
> 
>             createChannelTx - Create a transaction file for channel  
>             signChannelTx -  Sign transaction file for channel
>             createChannel - Create a channel 
>             joinChannel - join a channel
> 
>       Flags:
>          Used with modes:
>             -n <channel name> - Name of channel to create
>             -f <config file> - Path of config file
>             -b <output path> - path for save the output
>             -t <transaction path> - transaction file path 
>             -p <profile name> -Name of profile.

3. **Name**: chaincodeUtils.sh
>       Description:- 
>              use to deploy chaincode.  
> 
>       Usage:- 
>             chaincodeUtils.sh <Mode> [Flags]
>       Modes:-
>             A. <packageChaincode> - to install chaincode package.
>                ./chaincodeUtils.sh packageChaincode -n <CHAIN_CODE_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH> -l <LANGUAGE> -v <VERSION>
>             B. <installChaincode> - to install chaincode
>                ./chaincodeUtils.sh installChaincode -n <CHAIN_CODE_NAME> -f <CONFIG_PATH> -v <VERSION>
>             C. <chainCodeQueryinstalled> - chainCode install for which channel.
>                ./chaincodeUtils.sh chainCodeQueryinstalled  -f <CONFIG_PATH> 
>             D. <approveChaincode> - to approve chaincode.
                 ./chainCodeUtils.sh approveChaincode -n <CHAIN_CODE_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH> -l <LANGUAGE> -v <VERSION> -s <SEQUENCE> -c <CHANNEL_NAME>
              E. <checkCommitRediness> -  check for organization it's approve or not.
>                ./chaincodeUtils.sh checkCommitRediness -n <CHAIN_CODE_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH>  -c <CHANNEL_NAME> -s <SEQUENCE> -v <VERSION>
>             F. <commitChaincode> - to commit chaincode
>                ./chaincodeUtils.sh commitChaincode -n <CHAIN_CODE_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH>  -c <CHANNEL_NAME> -s <SEQUENCE>
> 
>             chainCodePackageInstall - this is for install package for chaincode
>             ChainCodeInstall -  this is for install chaincode 
>             chainCodeQueryinstalled -  chainCode install for which channel
>             approveChaincode - this is for approve chainCode
>             commitChaincode -   this is for commit chainCode
>             checkCommitRediness - this is for check organization approve or not
> 
>       Flags:-
>          Used with modes:
>             -c <channel name> - Name of channel 
>             -f <config file> - Path of config file
>             -b <output path> - path for save the output
>             -l <language> - this is for language 
>             -s <sequence> -this is for sequence
>             -v <version> - this is for version
>             -n <chaincode name>  - Name of chaincode.


4. **Name**: addOrgUtils.sh
>       Description:-
>              Used for adding new organization to channel.
> 
>       Usage:- 
>             addOrgUtils.sh <Mode> [Flags]
>       Modes:-
>             A. <fetch_config> - to fetch config file.
>               ./addOrgUtils.sh fetch_config -c <CHANNEL_NAME> -f <CONFIG_CFG> -b <OUTPUT_PATH>
>             B. <protobufToJson> - this function for to convert in photo buf format to JSON format.
>                ./addOrgUtils.sh protobufToJson -c <CHANNEL_NAME> -f <CONFIG_CFG> -b <OUTPUT_PATH>
>             C. <newOrg> - this function for  modifiy JSON file.
>                ./addOrgUtils.sh newOrg -c <CHANNEL_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH> -p <PROFILE> -m <MSP_ID> -s <STG_DIR>
>             D. <deltaConfig> - this function for update the config photo buf file.
>                ./addOrgUtils.sh deltaConfig -c <CHANNEL_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH>
>             E. <editableJSON> - this function for to convert photo buf to JSON file
>                ./addnetwork.sh editableJSON  -c <CHANNEL_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH>
>             F. <envelopeMSG> - this function for change in the JSON file.
>                ./addOrgUtils.sh envelopeMSG  -c <CHANNEL_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH>
>             G. <signConfigtxAsPeerOrg> - this function for to sign envelop message.
>                ./addOrgUtils.sh  signConfigtxAsPeerOrg -c <CHANNEL_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH> 
>             H. <channelUpdate> - this function for convert JSON file to photo buf format.
>                ./addOrgUtils.sh channelUpdate  -c <CHANNEL_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH>
> 
>             fetch_config - this is for to fetch config file.
>             protobufToJson - this is for to convert config file to json file.
>             newOrg - this function for modify JSON file.
>             deltaConfig - this function for update the config photo buf file.
>             editableJSON - this function for to convert photo buf to JSON file.
>             envelopeMSG - this function for change in the JSON file.
>             signConfigtxAsPeerOrg - this function for to sign envelop message.
>             channelUpdate - this function for convert JSON file to photo buf format.
> 
> 
>       Flags:-
>          Used with modes:
>             -c <channel name> - Name of channe
>             -f <path>  - path of config file 
>             -b <output path> - path for save file. 
>             -o <output> - path for save file.
>             -i <input> - this flag for input.


5. **Name**: genesisUtils.sh
>       Description:-
>             Used for generating a genesis block for Orderer service for a Consortium definition.
> 
>       Usage:-
> 		      genesisUtils.sh <Mode> [Flags]
> 		Modes:-
>             A. <generateGenesis> - Generate a Genesis Block.
>                ./genesisUtils.sh generateGenesis -n <PROFILE> -c <CHANNEL_NAME> -o <OUTPUT_PATH> -f <CONFIG_PATH>
> 
> 		      generateGenesis- Generate a Genesis Block
> 		      convertGnsBlockToJson- Convert Genesis Block to JSON
> 		      updateChannelCreatePolicy-Create Channel Create Policy
> 		      convertJsonToBlock- Convert Genesis Json to Block
> 
> 		Flags:-
> 		   Used with modes:-
> 		      -n <profile name> - Name of the profile
> 		      -c <channel name> -name of the channel 
> 		      -o <output path>- path to save output
> 		      -f <config file> - Path of config file
> 		      -ccp <channel creation policy> - create channel policy 

6. **Name**: joinPeerUtils.sh
>       Description:-
>             Used to join a peer of existing organization to an existing channel.
> 
>       Usage:-
>             joinPeerUtils.sh <Mode> [Flags]
>       Modes:-
>             A. <fetch_config> - This is for fetch config file.   
>                ./joinPeerUtils.sh fetch_config -n <CHANNEL_NAME> -f <CONFIG_PATH> -b <OUTPUT_PATH>
>             B. <joinChannel> - this function use for join channel.
>                ./joinPeerUtils.sh joinChannel -b <OUTPUT_PATH> 
> 
>             fetch_config - This is for fetch config file.
> 
>       Flags:-
>          Used with modes:-
>             -n <channel name> - Name of channe
>             -f <path>  - path of config file.
>             -b <output path> - path for save file.                                                        
