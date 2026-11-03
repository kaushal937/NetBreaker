import { statusMapping } from "../../config/initialize";
import BalanceShifter from "../serverStatus/loadAssigner"

function assignStatus(hostname: string, portNumber: number, value: number){
    if(portNumber==-1){
        return
    }
    let dnsHostnameDataIndex = statusMapping.findIndex((obj) => obj.hostname == hostname)
    let dnsHostnameData = (dnsHostnameDataIndex != -1)? statusMapping[dnsHostnameDataIndex] : null
    let portArray = dnsHostnameData?.StatusData
    let indexInPortArray = 0
    for(const obj of portArray?? []){
        if(obj.port == portNumber){
            indexInPortArray = portArray?.findIndex((objectToFind) => objectToFind.port == portNumber) ?? 0
        }
    }
    try{
        statusMapping[dnsHostnameDataIndex].StatusData[indexInPortArray].status = value
    }catch(e){
        return
    }
    // BalanceShifter.shiftBalance(hostname,portNumber)
}

export default {
    assignStatus
}