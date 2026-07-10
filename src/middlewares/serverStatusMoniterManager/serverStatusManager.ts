import {settingsData} from '../../config/initialize'
import ServerStatusModule from '../../controllers/serverStatus/serverStatus'

function handleServiceStatus(){
    return (req: any, res: any, next: any)=>{
        if(settingsData.runningStatus == 1){
            next()
        }else{
            res.status(503).end()
        }
    }
}

function handleTargetServiceStatus(){
    return (req: any, res: any, next: any)=>{
        if(settingsData.currentServerStatus == 1){
            next()
        }else{
            res.render("renderError", {errno:400, msg:"Server is currently unavailable"})
            ServerStatusModule.checkTargetServerStatus()
            // res.render("renderError", {errno:400, msg:"internal server error(s)"})
        }
    }
}

export default {
    handleServiceStatus,
    handleTargetServiceStatus
}