import {rate} from '../stats/requestRateCounter'

function limitRateTo(ratelimit: number){
    return (req: any, res: any, next: any)=>{
        if(rate > ratelimit){
            res.status(429).end()
        }else{
            next()
        }
    }
}

export {
    limitRateTo
}