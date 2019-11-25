package main

import (
	"fmt"
	"encoding/json"
	// "strings"
	
	"strconv"
	
	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

var logger = shim.NewLogger("sacc")


type SmartContract struct {

}


// type Notification struct {
// 	Timestamp                string `json:"timestamp"`
// 	Temperature		         string `json:"temperature"`		
// }


type TemperatureDetails struct {
	Timestamp				 string `json:"timestamp"`
	Temperature  			 string `json:"temperature"`
}

var threshold1 = 10
var threshold2 = 30


func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}


func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "addTemperature" {
		return s.addTemperature(APIstub, args)
	} else if function == "queryRecord" {
		 return s.queryRecord(APIstub, args)
	}
	return shim.Error("Invalid Smart Contract function name.")
}


func (s *SmartContract) addTemperature(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	
	var temperature = TemperatureDetails { Timestamp: args[1] , Temperature: args[2] }
	
	temp, _ := strconv.Atoi(args[2])
	if (temp < threshold1 || temp > threshold2)  {
		var notification = TemperatureDetails { Timestamp: args[1] , Temperature: args[2] }
		payloadAsBytes, _ := json.Marshal(notification)
		err := APIstub.SetEvent("notificationBreach",payloadAsBytes)
		if err != nil {
			return shim.Error("Error while setting event")
		}
	} 
	var temp_id = args[0]
	recordAsBytes, _ := json.Marshal(temperature)
	APIstub.PutState(temp_id,recordAsBytes)

	return shim.Success(nil)

}


func (s *SmartContract) queryRecord(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	// if len(args) != 1 {
	// 	return shim.Error("Incorrect number of arguments. Expecting 1")
	// }

	recordAsBytes, _ := APIstub.GetState(args[0])
	jsonResp := "{\"Id\":\"" + args[0] + "\",\"Value\":\"" + string(recordAsBytes) + "\"}"
	logger.Infof("Query Response:%s\n", jsonResp)
	return shim.Success(recordAsBytes)
	
}



func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}

