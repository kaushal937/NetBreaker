import allmisc from "../../miscellaneous/allmisc";
import { memoryUsageStats } from "../../interfaces/interfaces";

let memoryUsageStatsMem: memoryUsageStats = {
    memory : "0 MB"
}

let totalMemoryUsed: string

async function memoryUsageMonitor(){
    for (let i = 0; i > -1 ; i++) {
        await allmisc.sleep(1000)

        const memoryUsage = process.memoryUsage();
        memoryUsageStatsMem.memory = `${Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100} MB`
    }
}

export default {
    memoryUsageStatsMem,
    memoryUsageMonitor
}