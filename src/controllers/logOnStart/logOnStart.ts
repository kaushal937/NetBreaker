import {settingsData} from '../../config/initialize'

function logOnStart(){
    console.log("Service is running on port "+settingsData.port);
}

export default {
    logOnStart
}