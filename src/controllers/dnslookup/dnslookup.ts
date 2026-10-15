import { domainInventory, dnsZone, statusMapping } from "../../config/initialize";
import LoadFetcher from "../serverStatus/assignedLoadFetcher";

function smartDnsLookup(domainName: string, reqIP: string){
    console.dir(statusMapping, {depth : 5})
    if(checkDomainInventory(domainName)){
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