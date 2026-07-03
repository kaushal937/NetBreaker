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

//middlewares
import {requestRateCounter, refreshCounterAndUpdateRate} from './middlewares/stats/requestRateCounter'
import { handleIncomingCookie, handleOutGoingCookie } from './middlewares/cookieEncryption/cookieEncrypt';
import { limitRateTo } from './middlewares/ratelimiting/ratelimiting'

//config settings
initialize.initializeSettings(8, mainFunction)

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


//====layer 1 : rate-limiting
app.use(limitRateTo(settingsData.maxRequestRateLimit))


//====layer 2 : memory limiting/load queuer


//====layer 2: catches if the server is offline
function checkTargetServerStatus(){
    fetch(settingsData.targetURL+"/")
  .then(response => {
    settingsData.currentServerStatus=1
  })
  .catch(error => {
    console.log("⚠️ Target server offline")
    settingsData.currentServerStatus=0
  });
}
checkTargetServerStatus()

app.use((req, res, next) => {
    if(settingsData.runningStatus == 1 && settingsData.currentServerStatus == 1){
        next()
    }else if(settingsData.runningStatus != 1){
        res.render("renderError", {errno:400, msg:"Server is offline"})
    }else if(settingsData.currentServerStatus != 1){
        res.render("renderError", {errno:400, msg:"Server is currently unavailable"})
        checkTargetServerStatus()
    }else{
        res.render("renderError", {errno:400, msg:"internal server error(s)"})
    }
})


//====layer 3 : remove unnecessary headers

//remove the x-powered-by header
app.disable("x-powered-by");


//====layer 4 : Stats

//requests-per-second-counter
app.use(requestRateCounter)
refreshCounterAndUpdateRate()   //to initiate the request counter

//Log Stats
// Stats.LogStats(1000)

// memory-usage-updater
memoryUsageMonitor()

//====layer 5 : cookiehandlers
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
    console.log("Service is running on port "+settingsData.port);
    console.log("Forwarding port: "+settingsData.target)
    console.log("URL: "+"http://127.0.0.1:"+settingsData.port)
})

//mainfunction end
}


//to add :
// rate-limiter
// load queuer
// load balancer
// admin panel