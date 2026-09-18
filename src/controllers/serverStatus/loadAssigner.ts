import { statusMapping } from "../../config/initialize";

function shiftBalance(Hostname: string, portNumber: number){
    let dnsHostnameDataIndex = statusMapping.findIndex((obj) => obj.hostname == Hostname)
    let dnsHostnameData = (dnsHostnameDataIndex != -1)? statusMapping[dnsHostnameDataIndex] : null
    let portArray = dnsHostnameData?.StatusData?? []
    let indexInPortArray = 0
    let portToLoadMapping: Map<number, number> = new Map()
    let portToStatusMapping: Map<number, number> = new Map()
    let portLoadLength = portArray[indexInPortArray].loadAssignment.length
    for(const entity of portArray?? []){
        if(entity.port == portNumber){
            indexInPortArray = portArray?.findIndex((obj) => obj.port == portNumber)?? 0
        }
        portToLoadMapping.set(entity.port, entity.loadAssignment.length)
        portToStatusMapping.set(entity.port, entity.status)
    }
    if(portLoadLength == 0){
        return
    }else{
        let nonZeroPorts: number = 0;
        [...portToStatusMapping.entries()].forEach(elem =>{
            if(portToStatusMapping.get(elem[1]) == 1){
                nonZeroPorts++
            }
        })
        if(nonZeroPorts < 2){
            return
        }
        let divideAmong = Math.floor(portLoadLength/(nonZeroPorts-1))
        let divideAmongRemainder = portLoadLength%(nonZeroPorts-1)
        portArray.forEach(elem =>{
            
        })
        for(let i=0; i<divideAmong; i++){

        }

    }

}

export default {
    shiftBalance
}