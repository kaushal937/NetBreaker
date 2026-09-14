interface settings{
    port : number;
    runningStatus : number;
    currentServerStatus : number
    hostOS: string;
    cipherkey: string;
    cookieEncryption : number;
    maxRequestRateLimit : number;
    inspectOriginMode : string;
    adminMode : number;
    adminDefinedPath : string;
    adminRequiredReloadCount : number;
    adminReloadTimeWindow : number;
    protocol : string;
    sslKeyPath : string;
    sslCertPath : string;
}

interface memoryUsageStats{
    memory : string
}

interface sslOptions{
    key : Buffer;
    cert : Buffer;
}

interface IPMap{
    key : number[]
}
export {
    settings,
    memoryUsageStats,
    sslOptions,
    IPMap
}