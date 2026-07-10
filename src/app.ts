import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import { Readable } from 'stream';

import allmisc from './miscellaneous/allmisc';
import Stats from './middlewares/stats/allStats'
import {assignTargetServerStatus} from './middlewares/stats/targetServerStatus'
import {memoryUsageMonitor} from './middlewares/stats/computingPowerUsage'
import initialize from './config/initialize';
import {settingsData} from './config/initialize'
import ServerStatusModule from './controllers/serverStatus/serverStatus'
import ServiceStatusManager from './middlewares/serverStatusMoniterManager/serverStatusManager'
import LogOnStart from './controllers/logOnStart/logOnStart'
import NeutralizeIP from './middlewares/IpModule/ipNeutralization'
import OriginFiltering from './middlewares/IpModule/ipBasedFiltering'

//middlewares
import {requestRateCounter, refreshCounterAndUpdateRate} from './middlewares/stats/requestRateCounter'
import { handleIncomingCookie, handleOutGoingCookie } from './middlewares/cookieEncryption/cookieEncrypt';
import { limitRateTo } from './middlewares/ratelimiting/ratelimiting'

//config settings
initialize.initializeSettings(0, mainFunction)

//main function of the module; runs only when everythings alright, configs are loaded and other checklists are completed
async function mainFunction(){

//mainfunction start

const app = express();
app.use(cookieparser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//====layer 1 : Reject requests if NetBreaker is offline (runningStatus=0)
app.use(ServiceStatusManager.handleServiceStatus())

//====layer 2 : Ip Normalization & Origin Inspecter
app.use(NeutralizeIP.neutralizeIPv4AndIPv6)       //Adds req.normalIP, IP address regardless of IPv4 or IPv6
app.use(OriginFiltering.filterOrigin(settingsData.inspectOriginMode))

//====layer 2 : rate-limiting
app.use(limitRateTo(settingsData.maxRequestRateLimit))

//====layer 3 : memory limiting/load queuer


//====layer 4: catches if the server is offline
ServerStatusModule.checkTargetServerStatus()
app.use(ServiceStatusManager.handleTargetServiceStatus())

//====layer 5 : remove unnecessary headers
app.disable("x-powered-by");

//====layer 6 : Stats
app.use(requestRateCounter)
refreshCounterAndUpdateRate()   //to initiate the request counter

//Log Stats
Stats.LogStats(1000)                     //for development phase and testing

// memory-usage-updater
memoryUsageMonitor()

//====layer 7 : cookiehandlers
app.use(handleIncomingCookie(settingsData.cipherkey, settingsData.cookieEncryption))

//final response when every security layer is passed
app.use(async (req, res, next) => {
    await fetch(settingsData.targetURL+req.path, {
        method: (req.method).toString(),
        headers: req.headers as HeadersInit,
        body: req.body? JSON.stringify(req.body): null,
    }).then((response: any)=>{
        if(response.ok || response.status == "304"){
            settingsData.currentServerStatus=1
            assignTargetServerStatus(settingsData.currentServerStatus)
        }else{
            settingsData.currentServerStatus=0
            assignTargetServerStatus(settingsData.currentServerStatus)
        }

        response.headers.forEach((value: string, key: string) => {
            const lowerkey = key.toLowerCase()

            const headerblocklist = [
                'content-encoding',
                'content-length',   
                'transfer-encoding',
                'connection',
                'keep-alive',
                'x-powered-by'
            ]

            if(!headerblocklist.includes(lowerkey)){
                res.setHeader(key, value)
            }
        })

        res.setHeader("Set-Cookie", handleOutGoingCookie(response, settingsData.cipherkey, settingsData.cookieEncryption));

        res.status(response.status)
        if (!response.body){
            return res.end()
        }

        const stream = Readable.fromWeb(response.body as any)
        stream.pipe(res)
        next()
    }).catch((err)=>{
        settingsData.currentServerStatus=0
        assignTargetServerStatus(settingsData.currentServerStatus)
    })
});


app.listen(settingsData.port, () => {
    LogOnStart.logOnStart()
})

//mainfunction end
}


//to add :
// load queuer (based on memory usage)
// load balancer
// admin panel
//add a packet inspector
//fix rate limiter
//for authentication of admin, he/she will send a request access, and NB will send a random hash key, for every request, and then the admin will send the credentials in that hashed form, and NB will authorize it. one hash key for every request, and different for every IP address

//when an ip is added to whitelist by admin panel, update the ipwhitelist.nb file at that moment only
//add a lightweight standbymode when NetBreaker is off, ie status=0 or currentServerStatus=0, which responds as res.end()
//cookie encryption is working all good