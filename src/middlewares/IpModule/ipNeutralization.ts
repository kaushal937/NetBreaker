import IPNeutralizer from '../../controllers/IPNeutralizer/IPNeutralizer'

function neutralizeIPv4AndIPv6(req: any, res: any, next: any){
    req.normalIP = IPNeutralizer.neutralizeIP(req.ip)
    next()
}

export default {
    neutralizeIPv4AndIPv6
}