import allmisc from '../../miscellaneous/allmisc';

var refreshTime = 500    //in milliseconds
let rate = 0             //in requests per second
let requestCount = 0;

async function refreshCounterAndUpdateRate(){
    for (let i = 0; i > -1; i++) {
        await allmisc.sleep(refreshTime)
        rate = requestCount*(1000/refreshTime)
        requestCount = 0
    }
}

function requestRateCounter(req: any, res: any, next: any){
    requestCount = requestCount + 1
    next()
}

export default {requestRateCounter, refreshCounterAndUpdateRate, rate}
export {rate}