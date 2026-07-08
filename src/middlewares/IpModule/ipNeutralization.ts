import Misc from '../../miscellaneous/allmisc'

function neutralizeIPv4AndIPv6(req: any, res: any, next: any){
    req.normalIP = Misc.neutralizeIP(req.ip)
    next()
}

export default {
    neutralizeIPv4AndIPv6
}