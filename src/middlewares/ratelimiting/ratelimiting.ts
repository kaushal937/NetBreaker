import {rate} from '../stats/requestRateCounter'

function limitRateTo(ratelimit: number){
    return (req: any, res: any, next: any)=>{
        if(rate > ratelimit){
            if(Math.random() > (ratelimit/rate)){
                next()
            }else{
                res.status(429).end()
            }
        }else{
            next()
        }
    }
}

export default{
    limitRateTo
}