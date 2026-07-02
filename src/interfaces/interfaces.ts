interface settings{
    target : number;
    port : number;
    runningStatus : number;
    currentServerStatus : number
    hostOS: string;
    targetURL: string;
    cipherkey: string;
    cookieEncryption : number
}

interface memoryUsageStats{
    memory : string
}

export {
    settings,
    memoryUsageStats
}