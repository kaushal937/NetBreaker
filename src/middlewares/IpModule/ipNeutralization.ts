import IPNeutralizer from '../../controllers/IPNeutralizer/IPNeutralizer'
import { Request, Response, NextFunction } from 'express';

function neutralizeIPv4AndIPv6(req: Request, res: Response, next: NextFunction){
    req.normalIP = IPNeutralizer.neutralizeIP(req.ip?? "")
    next()
}

export default {
    neutralizeIPv4AndIPv6
}