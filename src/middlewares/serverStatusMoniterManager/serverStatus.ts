import AssignedPortFetcher from '../../controllers/serverStatus/assignedLoadFetcher'
import ProxyStatusAssigner from '../../controllers/serverStatus/statusAssigner'

function checkTargetServerStatus(){
    return (req: any, res: any, next: any)=>{
        var fetchPort = AssignedPortFetcher.assignedPort(req.hostname, req.normalIP) ?? -1
        fetch("http://127.0.0.1:"+fetchPort+"/")
        .then(response => {
            if(response.ok){
                ProxyStatusAssigner.assignStatus(req.hostname, fetchPort, 1)
                next()
            }else{
                ProxyStatusAssigner.assignStatus(req.hostname, fetchPort, 0)
                res.render("renderError", {errno: 500, msg: "Internal Server Error - Server is offline. Try again later.", errhash : "https://netbreaker.maywill.online/docs"})
            }
        })
        .catch(error => {
            ProxyStatusAssigner.assignStatus(req.hostname, fetchPort, 0);
            res.render("renderError", {errno: 500, msg: "Internal Server Error - Server is offline. Try again later.", errhash : "https://netbreaker.maywill.online/docs"});
        })
    }
}

export default { 
    checkTargetServerStatus
}