import {settingsData} from '../../config/initialize'
// import ServerStatusModule from '../../controllers/serverStatus/serverStatus'
import { Request, Response, NextFunction } from 'express';

function handleServiceStatus(){
    return (req: Request, res: Response, next: NextFunction)=>{
        if(settingsData.runningStatus == 1){
            next()
        }else{
            res.render("renderError", {errno: 500, msg: "NetBreaker is offline", errhash : "https://netbreaker.maywill.online/docs"})
        }
    }
}

function handleTargetServiceStatus(){
    return (req: Request, res: Response, next: NextFunction)=>{
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