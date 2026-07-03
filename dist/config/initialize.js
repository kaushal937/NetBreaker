"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsData = void 0;
const allmisc_1 = __importDefault(require("../miscellaneous/allmisc"));
const getsettings_1 = require("./getsettings");
const os_1 = __importDefault(require("os"));
let settingsData = {
    target: 0,
    port: 0,
    runningStatus: 0,
    currentServerStatus: 0,
    hostOS: "string",
    targetURL: "string",
    cipherkey: "",
    cookieEncryption: 1,
    maxRequestRateLimit: 5000
};
exports.settingsData = settingsData;
let settingsChecklistRequirement = 8;
let settingsChecklist = 0;
function waitstatus() {
    if (settingsChecklist == settingsChecklistRequirement) {
        return true;
    }
    else {
        return false;
    }
}
async function confirmSets(waitTime, mainCallBack) {
    //console settings to confirm
    console.log(settingsData);
    console.log(allmisc_1.default.breakline());
    console.log("is this OK? If not, press Ctrl+C");
    for (let i = waitTime; i > 0; i--) {
        console.log(`Starting server in ${i} seconds...`);
        await allmisc_1.default.sleep(1000);
    }
    console.log("initializing...");
    console.log(allmisc_1.default.breakline());
    mainCallBack();
}
function initializeSettings(waitTimeBeforeStarting, mainCallBack) {
    function gonext() {
        if (waitstatus()) {
            confirmSets(waitTimeBeforeStarting, mainCallBack);
        }
    }
    try {
        (0, getsettings_1.getsetting)("target", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                settingsData.target = parseInt(data ?? "3000");
                settingsChecklist++;
                gonext();
            }
        });
        (0, getsettings_1.getsetting)("port", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                settingsData.port = parseInt(data ?? "0");
                settingsChecklist++;
                gonext();
            }
        });
        (0, getsettings_1.getsetting)("status", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                settingsData.runningStatus = parseInt(data ?? "0");
                settingsChecklist++;
                gonext();
            }
        });
        (0, getsettings_1.getsetting)("cipherkey", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                settingsData.cipherkey = data?.toString() || "";
                settingsChecklist++;
                gonext();
            }
        });
        (0, getsettings_1.getsetting)("target", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                settingsData.targetURL = ("http://localhost:" + parseInt(data ?? "0"));
                settingsChecklist++;
                gonext();
            }
        });
        (0, getsettings_1.getsetting)("cookieEncryptOption", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                (data) ? allmisc_1.default.boolToNumber((data === "true")) : settingsData.cookieEncryption = parseInt(data ?? "1");
                settingsData.cookieEncryption = parseInt(data ?? "1");
                settingsChecklist++;
                gonext();
            }
        });
        (0, getsettings_1.getsetting)("maxRequestRateLimit", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                settingsData.maxRequestRateLimit = parseInt(data ?? "5000");
                settingsChecklist++;
                gonext();
            }
        });
        try {
            settingsData.hostOS = os_1.default.platform();
            settingsChecklist++;
            gonext();
        }
        finally {
            gonext();
        }
    }
    catch (e) {
        return 0;
    }
}
exports.default = { initializeSettings };
