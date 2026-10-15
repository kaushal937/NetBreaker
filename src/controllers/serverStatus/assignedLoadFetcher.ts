import { statusMapping } from "../../config/initialize";
import BalanceShifter from "../serverStatus/loadAssigner"
import { settingsData } from "../../config/initialize";

//checks if user is already listed in some instance, and if not, assigns the user a port.
function assignedPort(hostname: string, userIP: string){
    let dnsHostnameDataIndex = statusMapping.findIndex((obj) => obj.hostname == hostname)
    let dnsHostnameData = (dnsHostnameDataIndex != -1)? statusMapping[dnsHostnameDataIndex] : null
    let portArray = dnsHostnameData?.StatusData
    var portFound = false
    for(const obj of portArray?? []){
        if(obj.loadAssignment.includes(userIP)){
            portFound = true
            return obj.port
            break;
        }
    }
    if(!portFound){
        let lengthsOfLoadArray: number[] = []
        let portLoadMap: Map<number, number> = new  Map()
        portArray?.forEach((portElem)=>{
            lengthsOfLoadArray.push(portElem.loadAssignment.length)
            portLoadMap.set(portElem.loadAssignment.length, portElem.port)
        })
        // console.log(portLoadMap)
        let portToAssign: number = portLoadMap.get(Math.min(...lengthsOfLoadArray)) ?? 0
        // console.log("error in : \n"+"portLoadMap.get(Math.min(...lengthsOfLoadArray)) : "+portLoadMap.get(Math.min(...lengthsOfLoadArray)))
        let indexInPortArray = portArray?.findIndex((portObj) => portObj.port == portToAssign) ?? 0
        try{
            statusMapping[dnsHostnameDataIndex].StatusData[indexInPortArray].loadAssignment.push(userIP)
            return portToAssign
        }catch(e){
            //loginerrorfile
            console.log("error in line 33 of assignedLoadFetcher.ts\nplausible error: a type in  nbconfig/IPmap.json << config file")
            return settingsData.fallbackPort
        }
    }
}

export default {
    assignedPort
}