import IpListReader from '../../controllers/ipListModule/ipListParser'

function ipWhitelist(cb: any){
    IpListReader.readWhiteList((data: string[])=>{
        cb(data)
    })
}

function ipBlacklist(cb: any){
    IpListReader.readBlackList((data: string[])=>{
        cb(data)
    })
}

function filterOrigin(inspectionType: string){
    let typeOfFiltering: string 
    if(inspectionType.toLowerCase() == "bl"){
        typeOfFiltering = "bl"
    }else{
        typeOfFiltering = "wl"
    }
    return (req: any, res: any, next: any)=>{
        next()
    }
}



export default {
    filterOrigin
}