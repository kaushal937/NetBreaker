import { domainInventory, dnsZone } from "../../config/initialize";

function smartDnsLookup(domainName: string){
    if(domainInventory.includes(domainName)){
        return dnsZone.get(domainName) ?? [80]
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