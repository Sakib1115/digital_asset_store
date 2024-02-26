package main

import (
	"fmt"
	"github.com/hyperledger/fabric-chaincode-go/shim"
    "github.com/hyperledger/fabric-protos-go/peer"
	
)
type SmartContract struct {
	partner *Partner
}
func main() {
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) peer.Response {

	return shim.Success(nil)
}
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) peer.Response {
	function, args := APIstub.GetFunctionAndParameters()
	if function == "createPartnership" {
		return s.createPartnership(APIstub, args)
	}else if function == "updatePartnership" {
		return s.updatePartnership(APIstub, args)
	}else if function == "queryPartner" {
			return s.queryPartner(APIstub, args)
	}else if function == "queryAllPartner" {
		return s.queryAllPartner(APIstub)
    }else if function == "getHistoryForId" {
		return s.getHistoryForId(APIstub, args)
	}else if function == "delete" {
		return s.delete(APIstub, args)
	}

    return shim.Error("Invalid chaincode function name: " + function)
}

