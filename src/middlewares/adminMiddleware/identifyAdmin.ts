var IPMap = new Map()

function identifyAdmin(enable: number, adminPath: string, reloadCount: number, reloadTimeWindow: number){
    return (req: any, res: any, next: any)=>{
        if(enable == 1 && req.path==adminPath && req.method == "GET"){
            if(parseInt(IPMap.get((req.ip+"").toString())) > reloadCount){
                res.render("consoleUI")
                IPMap.set((req.ip+"").toString(), (0).toString())
            }else{
                if(IPMap.has((req.ip+"").toString())){
                    if((Date.now() - parseInt(IPMap.get((req.ip+"RegisteredTimestamp").toString()+"").toString())) < reloadTimeWindow-100){
                        IPMap.set((req.ip+"").toString(), (parseInt(IPMap.get((req.ip).toString()+"").toString())+1).toString())
                        IPMap.set((req.ip+"RegisteredTimestamp").toString(), Date.now().toString())
                        next()
                    }else{
                        IPMap.set((req.ip+"RegisteredTimestamp").toString(), Date.now().toString())
                        next()
                    }
                }else{
                    IPMap.set((req.ip+"").toString(), (0).toString())
                    IPMap.set((req.ip+"RegisteredTimestamp").toString(), Date.now().toString())
                    next()
                }
            }
        }else{
            next()
        }
    }
}

export default{
    identifyAdmin
}