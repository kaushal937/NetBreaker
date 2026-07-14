import {rate} from './requestRateCounter'
import RequestRateModule from './requestRateCounter'
import {targetServerStatus} from './targetServerStatus'
import ComputerUsage from './computingPowerUsage'
import allmisc from '../../miscellaneous/allmisc'

async function LogStats(rateOfLogging: number){
    for (let i = 0; i > -1; i++) {
        await allmisc.sleep(rateOfLogging)
        // process.stdout.clearLine(0)
        // process.stdout.cursorTo(0)
        // process.stdout.write("Request Rate : " + rate + ", Memory Usage (in MB) : "+ComputerUsage.memoryUsageStatsMem.memory)
        console.log("Request Rate : " + rate + ", Memory Usage (in MB) : "+ComputerUsage.memoryUsageStatsMem.memory)
    }
}

export default {rate, targetServerStatus, LogStats}