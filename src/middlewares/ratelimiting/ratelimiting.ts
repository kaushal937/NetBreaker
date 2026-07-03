import Stats from '../stats/allStats'

function limitRateTo(ratelimit: number){
    return (req: any, res: any, next: any)=>{
        (Stats.rate > ratelimit)? res.status(403).end() : next()
    }
}

export {
    limitRateTo
}