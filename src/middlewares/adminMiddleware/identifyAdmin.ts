var IPMap = new Map()

function identifyAdmin(enable: number, adminPath: string){
    return (req: any, res: any, next: any)=>{
        if(enable == 1 && req.path==adminPath && req.method == "GET"){
            if(parseInt(IPMap.get((req.ip+"").toString())) > 2){
                res.render("consoleUI")
                IPMap.set((req.ip+"").toString(), (0).toString())
            }else{
                if(IPMap.has((req.ip+"").toString())){
                    if((Date.now() - parseInt(IPMap.get((req.ip+"RegisteredTimestamp").toString()+"").toString())) < 4900){
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