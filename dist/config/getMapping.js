"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const rawIpMap = JSON.parse(node_fs_1.default.readFileSync(node_path_1.default.resolve(process.cwd(), '../nbconfig/IPMap.json'), 'utf-8'));
let availableDnsList = [];
let forwardDnsMap = new Map();
function DNSZone() {
    try {
        rawIpMap.forEach((element) => {
            availableDnsList.push(Object.keys(element)[0]);
            forwardDnsMap.set(Object.keys(element)[0], Object.values(element)[0]);
        });
    }
    catch (e) {
        console.log("Error in loading DNS zone. Subdomains may not point correctly");
    }
    return forwardDnsMap;
}
function DomainInventory() {
    try {
        rawIpMap.forEach((element) => {
            availableDnsList.push(Object.keys(element)[0]);
        });
    }
    catch (e) {
        console.log("Error in loading domain inventory. Subdomains may not point correctly");
    }
    return availableDnsList;
}
exports.default = { DNSZone, DomainInventory };
