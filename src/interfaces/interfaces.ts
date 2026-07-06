interface settings{
    target : number;
    port : number;
    runningStatus : number;
    currentServerStatus : number
    hostOS: string;
    targetURL: string;
    cipherkey: string;
    cookieEncryption : number;
    maxRequestRateLimit : number;
    inspectOriginMode : string;
}

interface memoryUsageStats{
    memory : string
}

export {
    settings,
    memoryUsageStats
}