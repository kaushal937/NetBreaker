import express from 'express';
import ejs, { render } from 'ejs';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import settings from './interfaces/interfaces';
import os from 'os';
import { Readable } from 'stream';

import allmisc from './miscellaneous/allmisc';
import {getsetting} from "./config/getsettings";


//config settings
let settingsData:settings = {
    target : 0,
    port : 0,
    runningStatus : 0,
    currentServerStatus : 0,
    hostOS: "string",
    targetURL : "string"
}

let settingsChecklistRequirement:number = 5
let settingsChecklist:number = 0

function waitstatus(){
    if(settingsChecklist == settingsChecklistRequirement){
        return true
    }else{
        return false
    }
}

function gonext(){
    waitstatus()? confirmSets() : null
}

async function confirmSets(){
    //console settings to confirm
    console.log(settingsData)
    console.log(allmisc.breakline())
    console.log("is this OK? If not, press Ctrl+C")

    for(let i=0; i>0; i--){                                //to set i=9
        console.log(`Starting server in ${i} seconds...`)
        await allmisc.sleep(1000);
    }

    console.log("initializing...")
    console.log(allmisc.breakline())

    mainFunction()
}

getsetting("target", (err: NodeJS.ErrnoException | null, data: string | null)=>{
    if(err){
        console.log(err)
        return
    }else{
        settingsData.target = parseInt(data ?? "3000")
        settingsChecklist++;
        gonext()
    }
})

getsetting("port", (err: NodeJS.ErrnoException | null, data: string | null)=>{
    if(err){
        console.log(err)
        return
    }else{
        settingsData.port = parseInt(data ?? "0")
        settingsChecklist++;
        gonext()
    }
})

getsetting("status", (err: NodeJS.ErrnoException | null, data : string | null)=>{
    if(err){
        console.log(err)
        return
    }else{
        settingsData.runningStatus = parseInt(data ?? "0")
        settingsChecklist++;
        gonext()
    }
})

try{
    settingsData.hostOS = os.platform()
    settingsChecklist++;
    gonext()
}finally{
    gonext()
}

getsetting("target", (err: NodeJS.ErrnoException | null, data: string | null)=>{
    if(err){
        console.log(err)
        return
    }else{
        settingsData.targetURL = ("http://localhost:"+parseInt(data ?? "0"))
        settingsChecklist++;
        gonext()
    }
})




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

//layer 1: catches if the server is offline
let currentServerStatus:number;

fetch(settingsData.targetURL+"/")
  .then(response => {
    currentServerStatus=1
  })
  .catch(error => {
    console.log("⚠️ Target server offline")
    currentServerStatus=0
  });

app.use((req, res, next) => {
    if(settingsData.runningStatus == 1 && currentServerStatus == 1){
        next()
    }else if(settingsData.runningStatus != 1){
        res.render("renderError", {errno:400, msg:"Server is offline"})
    }else if(currentServerStatus != 1){
        res.render("renderError", {errno:400, msg:"Server is currently unavailable"})
    }else{
        res.render("renderError", {errno:400, msg:"internal server error(s)"})
    }
})

//remove the x-powered-by header
app.disable("x-powered-by");


//final response when every security layer is passed
app.use(async (req, res, next) => {
    await fetch(settingsData.targetURL+req.path, {
        method: (req.method).toString(),
        headers: req.headers as HeadersInit,
        body: req.body? JSON.stringify(req.body): null,
    }).then((response: any)=>{
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
        
        res.status(response.status)
        if (!response.body){
            return res.end()
        }
        
        const stream = Readable.fromWeb(response.body as any)
        stream.pipe(res)
        next()
    })
});


app.listen(settingsData.port, () => {
    console.log("Service is running on port "+settingsData.port);
    console.log("Forwarding port: "+settingsData.target)
    console.log("URL: "+settingsData.targetURL)
})

//mainfunction end
}


//to add :
// rate-limiter
// cookie-encrypter
// load queuer
// load balancer
// admin panel