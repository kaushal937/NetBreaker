import {settingsData} from '../../config/initialize'

function checkTargetServerStatus(){
    fetch(settingsData.targetURL+"/")
  .then(response => {
    settingsData.currentServerStatus=1
  })
  .catch(error => {
    console.log("⚠️ Target server offline")
    settingsData.currentServerStatus=0
  });
}

export default { 
    checkTargetServerStatus
}