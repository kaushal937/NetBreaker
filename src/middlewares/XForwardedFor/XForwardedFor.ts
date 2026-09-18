function addXForwardedFor(){
    return (req: any, res: any, next: any)=>{
        req.headers["X-Forwarded-For"] = req.normalIP
        next()
    }
}

export default{
    addXForwardedFor
}