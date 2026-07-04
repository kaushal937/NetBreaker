import {settingsData} from '../../config/initialize'

function logOnStart(){
    console.log("Service is running on port "+settingsData.port);
    console.log("Forwarding port: "+settingsData.target)
    console.log("URL: "+"http://127.0.0.1:"+settingsData.port)
}

export default {
    logOnStart
}