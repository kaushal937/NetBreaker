import { Request, Response, NextFunction } from 'express';

function addXForwardedFor(){
    return (req: Request, res: Response, next: NextFunction)=>{
        req.headers["X-Forwarded-For"] = req.normalIP
        next()
    }
}

export default{
    addXForwardedFor
}