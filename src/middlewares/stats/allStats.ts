import {rate} from './requestRateCounter'
import {targetServerStatus} from './targetServerStatus'
import {memoryUsageStatsMem} from './computingPowerUsage'
import allmisc from '../../miscellaneous/allmisc'

async function LogStats(rateOfLogging: number){
    for (let i = 0; i > -1; i++) {
        await allmisc.sleep(rateOfLogging)
        console.log("Request Rate : " + rate + ", Memory Usage (in MB) : "+memoryUsageStatsMem.memory)
    }
}

export default {rate, targetServerStatus, memoryUsageStatsMem, LogStats}