import { statusMapping } from "../../config/initialize";

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
        let portToAssign = portLoadMap.get(Math.min(...lengthsOfLoadArray))
        let indexInPortArray = portArray?.findIndex((portObj) => portObj.port == portToAssign) ?? 0
        statusMapping[dnsHostnameDataIndex].StatusData[indexInPortArray].loadAssignment.push(userIP)
        return portToAssign
    }
}

export default {
    assignedPort
}