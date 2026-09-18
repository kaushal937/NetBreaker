import { domainInventory, dnsZone } from "../../config/initialize";
import LoadFetcher from "../serverStatus/assignedLoadFetcher";

function smartDnsLookup(domainName: string, reqIP: string){
    if(domainInventory.includes(domainName)){
        return LoadFetcher.assignedPort(domainName, reqIP)
    }else{
        return [-105]
    }
}
function checkDomainInventory(domainName: string){
    if(domainInventory.includes(domainName)){return true}else{return false}
}

export default {
    smartDnsLookup,
    checkDomainInventory
}