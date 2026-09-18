declare global {
  namespace Express {
    interface Request {
      normalIP?: string;
    }
  }
}

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

interface HostnameServerArrayData{
    port : number;
    status : number;
    loadAssignment : string[];
}

interface MiscellaneousData{
    views : number;
    reqs : number;
}

interface StatusMapping{
    hostname : string;
    StatusData : HostnameServerArrayData[],
    MiscellaneousData : MiscellaneousData
}

export {
    settings,
    memoryUsageStats,
    sslOptions,
    IPMap,
    StatusMapping,
    HostnameServerArrayData,
    MiscellaneousData
}