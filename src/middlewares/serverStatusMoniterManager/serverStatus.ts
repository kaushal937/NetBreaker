import AssignedPortFetcher from '../../controllers/serverStatus/assignedLoadFetcher'
import ProxyStatusAssigner from '../../controllers/serverStatus/statusAssigner'
import DNSModule from '../../controllers/dnslookup/dnslookup'

function checkTargetServerStatus(){
    return (req: any, res: any, next: any)=>{
        var fetchPort = AssignedPortFetcher.assignedPort(req.hostname, req.normalIP) ?? -1
        fetch("http://127.0.0.1:"+fetchPort+"/")
        .then(response => {
            if(response.ok){
                ProxyStatusAssigner.assignStatus(req.hostname, fetchPort, 1)
                console.log("jo")
                next()
            }else{
                ProxyStatusAssigner.assignStatus(req.hostname, fetchPort, 0)
                console.log("joi1")
                res.render("renderError", {errno: 500, msg: "Internal Server Error - Server is offline. Reload or wait."})
            }
        })
        .catch(error => {
            
            ProxyStatusAssigner.assignStatus(req.hostname, fetchPort, 0);
            res.render("renderError", {errno: 500, msg: "Internal Server Error - Server is offline. Reload or wait."});
        })
    }
}

export default { 
    checkTargetServerStatus
}