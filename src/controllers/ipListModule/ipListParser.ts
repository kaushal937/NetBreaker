import fileReader from '../lineReader/lineReader'
import path from 'path'

function readWhiteList(cb: any){
    fileReader.readFileAsArray(path.resolve(process.cwd(), '../nbconfig/ipWhitelist.txt'), (dataArray: string[])=>{
        cb(dataArray)
    })
}
// function writeWhiteList(){
//     return fileReader.readFileAsArray('./src/ipLists/ipWhitelist.txt')
// }

function readBlackList(cb: any){
    fileReader.readFileAsArray(path.resolve(process.cwd(), '../config/ipBlackList.txt') , (dataArray: string[])=>{
        cb(dataArray)
    })
}
// function writeBlackList(){
//     return fileReader.readFileAsArray('./src/ipLists/ipBlacklist.txt')
// }

export default {
    readWhiteList,
    readBlackList
}