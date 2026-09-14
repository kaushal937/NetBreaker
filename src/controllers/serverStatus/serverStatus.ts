import {settingsData} from '../../config/initialize'
import DNSModule from '../../controllers/dnslookup/dnslookup'

// function checkTargetServerStatus(hostname: string){
//     fetch("http://127.0.0.1"+DNSModule.dnslookup(hostname)[0]+"/")
//   .then(response => {
//     settingsData.currentServerStatus=1
//   })
//   .catch(error => {
//     settingsData.currentServerStatus=0
//   });
// }

// export default { 
//     checkTargetServerStatus
// }