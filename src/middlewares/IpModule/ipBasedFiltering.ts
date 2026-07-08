import { ipBlackList, ipWhiteList } from '../../config/initialize'

function ipWhitelistFilter(incomingIP: string){
    if(ipWhiteList.includes(incomingIP)){
        return true
    }else{
        return false
    }
}

function ipBlacklistFilter(incomingIP: string){
    if(!ipBlackList.includes(incomingIP)){
        return true
    }else{
        return false
    }
}

function filterOrigin(inspectionType: string){
    let typeOfFiltering: string 
    if(inspectionType.toLowerCase() == "blacklist"){
        typeOfFiltering = "bl"
    }else{
        typeOfFiltering = "wl"
    }
    return (req: any, res: any, next: any)=>{
        if(typeOfFiltering == "bl"){
            (ipBlacklistFilter(req.normalIP.toString()?? "null"))? next() : res.status(403).end()
        }else{
            (ipWhitelistFilter(req.normalIP.toString()?? "null"))? next() : res.status(403).end()
        }
    }
}

export default {
    filterOrigin
}