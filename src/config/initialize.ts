import {settings, StatusMapping, HostnameServerArrayData, MiscellaneousData} from '../interfaces/interfaces';
import allmisc from '../miscellaneous/allmisc';
import {getsetting} from "./getsettings";
import IPMapping from "./getMapping";
import os from 'os'
import ipListReaders from '../controllers/ipListModule/ipListParser'

let settingsData:settings = {
    port : 0,
    runningStatus : 0,
    currentServerStatus : 1,
    hostOS: "string",
    cipherkey : "",
    cookieEncryption : 1,
    maxRequestRateLimit : 5000,
    inspectOriginMode: "wl",
    adminMode : 1,
    adminDefinedPath : "/",
    adminRequiredReloadCount : 5,
    adminReloadTimeWindow : 5000,
    protocol : "http",
    sslKeyPath : "/etc",
    sslCertPath : "/etc"
}

let statusMapping: StatusMapping[] = []

let ipBlackList: string[]
let ipWhiteList: string[]

let domainInventory: string[]
let dnsZone: Map<string, number[]>

let settingsChecklistRequirement: number = 14
let settingsChecklist: number = 0

function waitstatus(){
    if(settingsChecklist == settingsChecklistRequirement){
        return true
    }else{
        return false
    }
}

async function confirmSets(waitTime: number, mainCallBack: any){
    console.log(settingsData)
    console.log(allmisc.breakline())
    console.log("is this OK? If not, press Ctrl+C")
    for(let i=waitTime; i>0; i--){
        console.log(`Starting server in ${i} seconds...`)
        await allmisc.sleep(1000);
    }
    console.log("initializing...")
    console.log(allmisc.breakline())
    mainCallBack()
}

function initializeSettings(waitTimeBeforeStarting: number, mainCallBack: any){
    function gonext(){
        if(waitstatus()){
            confirmSets(waitTimeBeforeStarting, mainCallBack)
        }
    }
    try{
        getsetting("port", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.port = parseInt(data ?? "0")
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("status", (err: NodeJS.ErrnoException | null, data : string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.runningStatus = parseInt(data ?? "0")
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("cipherkey", (err: NodeJS.ErrnoException | null, data : string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.cipherkey = data?.toString() || ""
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("cookieEncryptOption", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                (data)? allmisc.boolToNumber((data === "true")) : settingsData.cookieEncryption = parseInt(data ?? "1")
                settingsData.cookieEncryption = parseInt(data ?? "1")
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("maxRequestRateLimit", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.maxRequestRateLimit = parseInt(data ?? "5000")
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("protocol", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.protocol = data?.toString() || "http"
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("sslKeyPath", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.sslKeyPath = data?.toString() || "/etc"
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("sslCertPath", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.sslCertPath = data?.toString() || "/etc"
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("inspectOriginMode", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.inspectOriginMode = data?? "wl"
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("adminMode", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.adminMode = parseInt(data?? "1") 
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("adminDefinedPath", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.adminDefinedPath = data?? "/" 
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("adminDefinedPathRequiredReloadCount", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.adminRequiredReloadCount = parseInt(data?? "5")
                settingsChecklist++;
                gonext()
            }
        })
        getsetting("adminDefinedPathReloadTimeWindow", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.adminReloadTimeWindow = parseInt(data?? "5000" )
                settingsChecklist++;
                gonext()
            }
        })
        try{
            settingsData.hostOS = os.platform()
            settingsChecklist++;
            gonext()
        }finally{
            gonext()
        }
        try{
            ipListReaders.readBlackList((List: string[])=>{
                ipBlackList = List
            })
            ipListReaders.readWhiteList((List: string[])=>{
                ipWhiteList = List
            })
        }catch(e){
            ipBlackList = ["error"]
            ipWhiteList = ["error"]
        }
        try{
            domainInventory = IPMapping.DomainInventory()
            dnsZone = IPMapping.DNSZone()
        }catch(e){
            domainInventory = ['error']
            dnsZone = new Map().set("error", [-1])
        }
        try{
            function returnServerArrayData(Hostname: string){
                var subArray = iterableDnsZoneEntries.find(([toFind]) => toFind == Hostname)
                var portArray = subArray? subArray[1] : [-8]
                return portArray
            }

            const iterableDnsZoneEntries = [...dnsZone.entries()]
            var ServerData: StatusMapping[] = []
            domainInventory.forEach((dname)=>{
                var dnamePorts: HostnameServerArrayData[] = []
                returnServerArrayData(dname).forEach((portNumber)=>{
                    dnamePorts.push({
                        port : portNumber,
                        status : 0,
                        loadAssignment : []
                    })
                })
                ServerData.push({
                    hostname : dname,
                    StatusData : dnamePorts,
                    MiscellaneousData : {
                        views : 0,
                        reqs : 0
                    }
                })
            })
            statusMapping = ServerData
            console.dir(statusMapping, { depth: null, colors: true })
        }catch(e){
            console.log("Error is Status assignment of proxy servers")
        }
    }catch(e){
        return 0
    }
}

export default { initializeSettings }
export { settingsData, ipBlackList, ipWhiteList, domainInventory, dnsZone, statusMapping}