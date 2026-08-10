import AdminCommands from '../../controllers/adminModule/adminController'

function processXAdminHeader(adminPath: string, adminPass: string){
    return (req: any, res: any, next: any)=>{
        if(req.headers["x-admin"] == "true" && req.path == adminPath){
            AdminCommands.execute(req.body.command, adminPass, (data: JSON)=>{
                res.json(data)
            })
        }else{
            next()
        }
    }
}

export default{
    processXAdminHeader
}