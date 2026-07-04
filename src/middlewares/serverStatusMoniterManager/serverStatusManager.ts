import {settingsData} from '../../config/initialize'
import ServerStatusModule from '../../controllers/serverStatus/serverStatus'

function handleServiceStatus(){
    return (req: any, res: any, next: any)=>{
        if(settingsData.runningStatus == 1 && settingsData.currentServerStatus == 1){
        next()
    }else if(settingsData.runningStatus != 1){
        res.render("renderError", {errno:400, msg:"Server is offline"})
    }else if(settingsData.currentServerStatus != 1){
        res.render("renderError", {errno:400, msg:"Server is currently unavailable"})
        ServerStatusModule.checkTargetServerStatus()
    }else{
        res.render("renderError", {errno:400, msg:"internal server error(s)"})
    }
    }
}

export default {
    handleServiceStatus
}