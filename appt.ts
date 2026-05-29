// const express = require('express');
// import express from "express";
// const fetch = require('node-fetch').default;
// const fs = require('fs');
// const app = express();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({extended : false}));

// let settingPath = "./bin_data/config.gsett"

// let config = {
//   target : "0",
//   port : 0,
//   proxyPort : 0,
//   runningStatus : 0
// }

// async function setupConfig(){
//   let path = "./bin_data/config.gsett"
//     fs.readFile(path, "utf-8", (err: any, data: any)=>{
//         if(data){
//             let val = data.split(/\r\n|\n/)
//             let final = "["+val.toString()+"]"
//             letdoubleFinal = JSON.parse(final)
//             config.target = letdoubleFinal[0]
//             config.port = parseInt(letdoubleFinal[1])
//             config.proxyPort = parseInt(letdoubleFinal[2])
//             config.runningStatus = parseInt(letdoubleFinal[3])
//         }else if(err){
//             console.log("error")
//             return
//         }
//     })
// }

// let targetUrl;
// fs.readFile('./bin_data/address.txt', 'utf-8', (err, data)=>{
//   if(err){
//     console.log(err)
//   }else{
//     targetUrl = "http://"+data;
//   }
// }) || 'localhost:80'

// let serverStatus;
// function statusAssigner(){
//   fs.readFile('./bin_data/onoff.txt', 'utf-8',(err, data)=>{
//     if(err){
//       console.log(err)
//     }else{
//       serverStatus = data;
//     }
//   })
// }
// statusAssigner();

// app.use(async (req, res, next) => {

//   if(config.runningStatus == 1){
//     next();
//   }else{
//     res.status(503).send("Service Unavailable");
//   }

// });

// app.use(async (req, res, next) => {
    
//     let responseFinal = await fetch((config.target+config.port+req.path).toString(), {
//       method: (req.method).toString(),
//       headers: req.headers,
//       body: req.body? JSON.stringify(req.body) : null,
//     })

//     //catching error is left

//     responseFinal.body.pipe(res);

// });

// setupConfig();
// app.listen(config.port, () => {
//   console.log(`gProxy started on port : ${config.port}`);
// });

//create a folder synchronizer

//----------------------------------------------------------------------------------------------------\\

//_____node-modules_____

// import express from "express";
// import fs from "fs";
// import path from "path";
// import { exec } from "child_process";