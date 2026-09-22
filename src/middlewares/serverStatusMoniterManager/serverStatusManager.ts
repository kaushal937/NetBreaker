import {settingsData} from '../../config/initialize'
// import ServerStatusModule from '../../controllers/serverStatus/serverStatus'

function handleServiceStatus(){
    return (req: any, res: any, next: any)=>{
        if(settingsData.runningStatus == 1){
            next()
        }else{
            res.render("renderError", {errno: 500, msg: "NetBreaker is offline", errhash : "https://netbreaker.maywill.online/docs"})
        }
    }
}

function handleTargetServiceStatus(){
    return (req: any, res: any, next: any)=>{
        if(settingsData.currentServerStatus == 1){
            next()
        }else{
            res.render("renderError", {errno:400, msg:"Server is currently unavailable", errhash : "https://netbreaker.maywill.online/docs"})
            // ServerStatusModule.checkTargetServerStatus()
            // res.render("renderError", {errno:400, msg:"internal server error(s)"})
            next()
        }
    }
}

export default {
    handleServiceStatus,
    handleTargetServiceStatus
}