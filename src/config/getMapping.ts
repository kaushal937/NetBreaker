import fs from 'node:fs';
import path from 'node:path';

import {IPMap} from '../interfaces/interfaces'

const rawIpMap = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '../nbconfig/IPMap.json'), 'utf-8'))

let availableDnsList: string[] = []
let forwardDnsMap: Map<string, number[]> = new Map()

function DNSZone(){
    try{
        rawIpMap.forEach((element: IPMap)=>{
            forwardDnsMap.set(Object.keys(element)[0], Object.values(element)[0])
        })
    }catch(e){
        console.log("Error in loading DNS zone. Subdomains may not point correctly")
    }
    
    return forwardDnsMap
}

function DomainInventory(){
    
    try{
        rawIpMap.forEach((element: IPMap)=>{
            availableDnsList.push(Object.keys(element)[0])
        })
    }catch(e){
        console.log("Error in loading domain inventory. Subdomains may not point correctly")
    }

    return availableDnsList
}

export default {DNSZone, DomainInventory}