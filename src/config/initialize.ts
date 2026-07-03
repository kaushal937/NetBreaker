import {settings} from '../interfaces/interfaces';
import allmisc from '../miscellaneous/allmisc';
import {getsetting} from "./getsettings";
import os from 'os'

let settingsData:settings = {
    target : 0,
    port : 0,
    runningStatus : 0,
    currentServerStatus : 0,
    hostOS: "string",
    targetURL : "string",
    cipherkey : "",
    cookieEncryption : 1,
    maxRequestRateLimit : 5000
}

let settingsChecklistRequirement: number = 8
let settingsChecklist: number = 0

function waitstatus(){
    if(settingsChecklist == settingsChecklistRequirement){
        return true
    }else{
        return false
    }
}

async function confirmSets(waitTime: number, mainCallBack: any){
    //console settings to confirm
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
        getsetting("target", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.target = parseInt(data ?? "3000")
                settingsChecklist++;
                gonext()
            }
        })
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

        getsetting("target", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(err){
                console.log(err)
                return
            }else{
                settingsData.targetURL = ("http://localhost:"+parseInt(data ?? "0"))
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
        try{
            settingsData.hostOS = os.platform()
            settingsChecklist++;
            gonext()
        }finally{
            gonext()
        }
    }catch(e){
        return 0
    }
}

export default { initializeSettings }
export { settingsData }