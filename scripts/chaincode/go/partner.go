
/* Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 /*
 * The sample smart contract for documentation topic:
 * Writing Your First Blockchain Application
 */

 package main

 /* Imports
  * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
  * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
  */
import (
	
	"encoding/json"
	"fmt"
	"bytes"
	"time"
	"strconv"
	"github.com/hyperledger/fabric-chaincode-go/shim"
    "github.com/hyperledger/fabric-protos-go/peer"
)
type Partner struct {
}
type QueryResult struct {
	Key    string `json:"Key"`
	Record *partnership
}
type GP struct {
	ID         		string `json:"ID"`
	Firstname		string `json:"Firstname"`
	Lastname		string `json:"Lastname"`
	Email			string `json:"Email"`
	Type			string `json:"Type"`

}
type AM struct {
	ID 						string `json:"ID"`
	Email					string `json:"Email"`
	FirstName				string `json:"FirstName"`
	LastName				string `json:"LastName"`
	Type 					string `json:"Type"`

}
type ASSET struct {
	Asset_Code					string `json:"Asset_Code"`
	Asset_Name					string `json:"Asset_Name"`
	Type						string `json:"Type"`
    Address						string `json:"Address"`
	City						string `json:"City"`
	State						string `json:"State"`
	Country						string `json:"Country"`
	Area						string `json:"Area"`
	Occupancy                   string `json:"Occupancy"`
	Occupancy_Holding_Date		string `json:"Occupancy_Holding_Date"`
	Partnership_ID				string `json:"Partnership_ID"`
	AssetTenant					[]TD   `json:"assetTenant"`
	AssetDocuments				[]DOC	`json:"assetDocuments"`

}
type DOC struct {
	Document_Id					string `json:"Document_Id"`
	Document_Name				string `json:"Document_Name"`
	Document_For				string `json:"Document_For"`
	Document_Frequency			string `json:"Document_Frequency"`
	Document_Type				string `json:"Document_Type"`
	Uploaded_On 				string `json:"Uploaded_On"`
}
type PARTNER_DOC struct {
	Document_Id					string `json:"Document_Id"`
	Document_Name				string `json:"Document_Name"`
	Document_For				string `json:"Document_For"`
	Document_Frequency			string `json:"Document_Frequency"`
	Document_Type				string `json:"Document_Type"`
	Uploaded_On 				string `json:"Uploaded_On"`
}
type TD struct {
	Asset_Code					string `json:"Asset_Code"`
	Tenant_Id					string `json:"Tenant_Id"`
	Tenant_Name					string `json:"Tenant_Name"`
	Tenant_Since				string `json:"Tenant_Since"`
	Agreement_Upto				string `json:"Agreement_Upto"`
	Agreement_Type				string `json:"Agreement_Type"`
}
type partnership struct {
	Partnership_ID			string 			`json:"Partnership_ID"`
	Partnership_Code		string 			`json:"Partnership_Code"`
	Partnership_Name		string 		    `json:"Partnership_Name"`
	Partnership_Since		string 			`json:"Partnership_Since"`
	Partnership_Value		string 			`json:"Partnership_Value"`
	Partnership_Summary		string			`json:"Partnership_Summary"`
	IsActive				string 			`json:"IsActive"`
	Gp				    	GP 				`json:"Gp"`
	Lp						[]LP    		`json:"Lp"`
	Am 						AM 				`json:"Am"`
	Asset                   []ASSET 		`json:"Asset"`
	Document				[]PARTNER_DOC   `json:"Document"`
}
type LP struct {
	LP_Id					string `json:"LP_Id"`
	Partnership_Id			string `json:"Partnership_Id"`
	FirstName				string `json:"FirstName"`
	LastName				string `json:"LastName"`
	Email					string `json:"Email"`
	Status					string `json:"Status"`
	Partnership_Since 		string `json:"Partnership_Since"`
	Investments				[]Investments `json:"Investments"`
	Preferred_Return		string `json:"Preferred_Return"`
	Catch_Up				string `json:"Catch_Up"`
	Carried_Interest		string `json:"Carried_Interest"`
	IRR						string `json:"IRR"`
	Next_Carried_Interest	string `json:"Next_Carried_Interest"`
	Total_Amount			string 	`json:"Total_Amount"`
	Type					string `json:"Type"`

}
type Investments struct {
	InvestmentID			string `json:"InvestmentID"`
	Amount					string `json:"Amount"`
	Agreement_Doc			string `json:"Agreement_Doc"`
}
func (s *SmartContract) createPartnership(APIstub shim.ChaincodeStubInterface, args []string) peer.Response{
	var partner partnership
	var Lp LP
	var Gp GP
	var Am AM
	var Asset ASSET 
	var Td TD
	var Doc DOC
	var Partner_Doc PARTNER_DOC
	var investment Investments

	err := json.Unmarshal([]byte(args[0]), &partner)
	fmt.Println("partner", partner)
	if err != nil {
		return shim.Error("Input argument unmarshling error")
	}
	// if len(partner.Partnership_Name) == 0 {
	// 	return shim.Error(" Partnership Name is mandatory")
	// }
	if len(partner.Partnership_ID) == 0 {
		return shim.Error("User Id is mandatory")
	}
	fmt.Println("partner", partner.Partnership_ID)
	fmt.Println("Gp",partner.Gp.ID )
	fmt.Println("Gp",partner.Gp.ID )
	if len(partner.Gp.ID) == 0 {
		return shim.Error("Gp Id is mandatory")
	}
	if len(partner.Am.ID) == 0 {
		return shim.Error("Am Id is mandatory")
	}
	if recordBytes, _ := APIstub.GetState(partner.Partnership_ID); len(recordBytes) > 0 {
		return shim.Error("Partnership already registered. Provide an unique userid")
	}else if recordBytes, _ := APIstub.GetState(Lp.LP_Id); len(recordBytes) > 0 {
			return shim.Error("Partnership already registered. Provide an unique userid")
	}else if recordBytes, _ := APIstub.GetState(Asset.Asset_Code); len(recordBytes) > 0 {
		return shim.Error("Partnership already registered. Provide an unique userid")
    }else {

		Am.ID=partner.Am.ID;
		Am.Email=partner.Am.Email;
		Am.FirstName=partner.Am.FirstName;
		Am.LastName=partner.Am.LastName;
		Am.Type=partner.Am.Type;
		var amData = AM{
			ID:			    Am.ID,        
			Email:		    Am.Email,
			FirstName:		Am.FirstName,
			LastName:		Am.LastName,
			Type:			Am.Type,
		}

	
		var tdData = TD{
			Asset_Code:		    Td.Asset_Code,
			Tenant_Id:			Td.Tenant_Id,
			Tenant_Name:		Td.Tenant_Name,
			Tenant_Since: 		Td.Tenant_Since,	
			Agreement_Upto:	    Td.Agreement_Upto,	
			Agreement_Type:  	Td.Agreement_Type,
		}
	
		var docData = PARTNER_DOC{
			Document_Id:				Partner_Doc.Document_Id,
			Document_Name:			    Partner_Doc.Document_Name,
			Document_For: 			    Partner_Doc.Document_For,	
			Document_Frequency:			Partner_Doc.Document_Frequency,	
			Document_Type:			    Partner_Doc.Document_Type,
			Uploaded_On:				Partner_Doc.Uploaded_On,
		}

		var documentData = DOC{
			Document_Id:				Doc.Document_Id,
			Document_Name:			Doc.Document_Name,
			Document_For: 			Doc.Document_For,	
			Document_Frequency:			Doc.Document_Frequency,	
			Document_Type:			Doc.Document_Type,
			Uploaded_On:				Doc.Uploaded_On,
		}


		var assetData= ASSET{
			Asset_Code:					Asset.Asset_Code ,
			Asset_Name:					Asset.Asset_Name ,
			Type:						Asset.Type ,
			Address:					Asset.Address ,
			City:						Asset.City ,
			State:						Asset.State ,
			Country:					Asset.Country ,
			Area:						Asset.Area ,
			Occupancy_Holding_Date:		Asset.Occupancy_Holding_Date ,
			Partnership_ID:				Asset.Partnership_ID ,
			AssetTenant:				[]TD{tdData},
			AssetDocuments:        		[]DOC{documentData},

		}


		var investmentData=Investments{
			InvestmentID:			investment.InvestmentID,
			Amount:					investment.Amount,
			Agreement_Doc:    		investment.Agreement_Doc,	
		}
		

		var lpData = LP{
			LP_Id:		        		Lp.LP_Id,
			Partnership_Id:				Lp.Partnership_Id,
			FirstName:					Lp.FirstName,
			LastName:					Lp.LastName,
			Status:						Lp.Status,
			Partnership_Since: 			Lp.Partnership_Since,	
			Investments:				[]Investments{investmentData},
			Preferred_Return:   		Lp.Preferred_Return,
			Catch_Up:           		Lp.Catch_Up,
			Carried_Interest:   		Lp.Carried_Interest,
			IRR:						Lp.IRR,
			Next_Carried_Interest:      Lp.Next_Carried_Interest,
			Total_Amount:				Lp.Total_Amount,
			Type:					    Lp.Type,
		}

		Gp.ID = partner.Gp.ID;
		Gp.Firstname= partner.Gp.Firstname;
		Gp.Email= partner.Gp.Email;
		Gp.Lastname= partner.Gp.Lastname;
		Gp.Type=partner.Gp.Type;
		var gpData = GP{
			ID:				Gp.ID,        
			Firstname:		Gp.Firstname,
			Email:			Gp.Email,
			Lastname: 	    Gp.Lastname,
			Type:			Gp.Type,
		}

		var usr = partnership{
			Partnership_ID:   	   partner.Partnership_ID,
			Partnership_Code:	   partner.Partnership_Code,
			Partnership_Name:      partner.Partnership_Name,
			Partnership_Since:     partner.Partnership_Since,
			Partnership_Value:     partner.Partnership_Value,
			Partnership_Summary:   partner.Partnership_Summary,	
			IsActive:		       partner.IsActive,
			Gp:				   	   gpData,
			Lp:					   []LP{lpData},
			Am:					   amData,
			Asset:				   []ASSET{assetData},
			Document:			   []PARTNER_DOC{docData},
		}
		partnerAsByte, _ := json.Marshal(usr)
		// LpAsByte, _ := json.Marshal(lpData)
		GpAsByte, _ := json.Marshal(gpData)
		AmAsByte, _ := json.Marshal(amData)
		// AssetAsByte, _ := json.Marshal(assetData)
		APIstub.PutState(partner.Partnership_ID, partnerAsByte)
		// APIstub.PutState(Lp.LpId, LpAsByte)
		APIstub.PutState(Gp.ID, GpAsByte)
		APIstub.PutState(Am.ID, AmAsByte)
		// APIstub.PutState(Asset.Asset_Code, AssetAsByte)
		partnerData := map[string]interface{}{
			"trxnID":  APIstub.GetTxID(),
			"status":  true,
			"message": "success",
			"data":    usr,
		}
		partnerJSON, _ := json.Marshal(partnerData)
	
		return shim.Success(partnerJSON)
	}
}
func (s *SmartContract) updatePartnership(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	fmt.Println("check=====len(args)",len(args))
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
	var partner partnership
	err := json.Unmarshal([]byte(args[0]), &partner)
	if err != nil {
		return shim.Error("Input arguments unmarshling error")
	}
	fmt.Println("check=====0000")
	fmt.Println("unmarshal user details", partner)
	AsByte, err := stub.GetState(partner.Partnership_ID)
	fmt.Println("check=====111",AsByte)
	if err != nil {
		return shim.Error("error while getting the User")
		} else if len(AsByte) == 0 {
			return shim.Error(" id : " + partner.Partnership_ID + " does not exist")
		}
		fmt.Println("check=====111")
	var updatePartnership partnership
	err = json.Unmarshal(AsByte, &updatePartnership)
	if err != nil {
		return shim.Error("Existing user details unmarshaling error : " + string(err.Error()))
	}
	fmt.Println("check=====222222")
	updatePartnership.Partnership_Name = partner.Partnership_Name
	updatePartnership.Partnership_Since = partner.Partnership_Since
	updatePartnership.Partnership_Value = partner.Partnership_Value
	updatePartnership.Partnership_Summary = partner.Partnership_Summary
	updatePartnership.IsActive = partner.IsActive
	updatePartnership.Document=partner.Document
	updatePartnership.Lp = partner.Lp
	updatePartnership.Gp = partner.Gp
	updatePartnership.Am = partner.Am
	updatePartnership.Asset= partner.Asset
	fmt.Println("check=====3333")
	updateAsByte, err := json.Marshal(updatePartnership)
	err = stub.PutState(partner.Partnership_ID, updateAsByte)
	fmt.Println("check=====44444")
	if err != nil {
		return shim.Error("Error while inserting the data into Ledger : " + err.Error())
	}
	fmt.Println("check=====55555555")
	finalData := map[string]interface{}{
		"status":  "true",
		"message": "successfully changed details",
		"trxnID":  stub.GetTxID(),
		"data":    updatePartnership,
	}
	DataAsByte, err := json.Marshal(finalData)
	fmt.Println("check=====666666")
	return shim.Success(DataAsByte)
}

func (s *SmartContract) queryPartner(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) !=1 {
		return shim.Error("Incorrect number of arguments")
	}
	AsBytes, err := APIstub.GetState(args[0],)
		if err !=nil{
			return shim.Error("Failed to read from world state ")
		}
		if AsBytes == nil {
			return shim.Error("id does not exist")
		}
		return shim.Success(AsBytes)
}
func (s *SmartContract) queryAllPartner(APIstub shim.ChaincodeStubInterface) peer.Response {
	startKey := ""
	endKey := ""
	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllCars:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
func (s *SmartContract) getHistoryForId(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
	
	UserId := args[0]
    fmt.Printf("- start getHistoryForPartner: %s\n", UserId)
	resultsIterator, err := APIstub.GetHistoryForKey(UserId)
	if err != nil {
		return shim.Error(err.Error())
	}
	
	defer resultsIterator.Close()
    // buffer is a JSON array containing historic values for the marble
	var buffer bytes.Buffer
	buffer.WriteString("[")
    bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")
        buffer.WriteString(", \"Value\":")

		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}
        buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")
        buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")
        buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")
    fmt.Printf("- getHistoryForPartner returning:\n%s\n", buffer.String())
    return shim.Success(buffer.Bytes())
}

func (s *SmartContract) delete(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {
	// var jsonResp string
	// var partner partnership
	if len(args) !=1 {
		return shim.Error("Incorrect number of arguments")
	}
	AsBytes, err := APIstub.GetState(args[0],)
		if err !=nil{
			return shim.Error("Failed to read from world state ")
		}
		if AsBytes == nil {
			return shim.Error("id does not exist")
		}
	fmt.Println("check=====0006")
	err = APIstub.DelState(args[0],)
	fmt.Println("check=====0007")
	if err != nil {
		fmt.Println("check=====0008")
		return shim.Error("Failed to delete state:" + err.Error())
	}
	fmt.Println("check=====0009")
	return shim.Success(nil)

}










