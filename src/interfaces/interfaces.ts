interface settings{
    target : number;
    port : number;
    runningStatus : number;
    currentServerStatus : number
    hostOS: string;
    targetURL: string;
}

interface memoryUsageStats{
    memory : string
}

export {
    settings,
    memoryUsageStats
}