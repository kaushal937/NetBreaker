import fileReader from '../lineReader/lineReader'

function readWhiteList(cb: any){
    fileReader.readFileAsArray('./src/ipLists/ipWhitelist.txt', (dataArray: string[])=>{
        cb(dataArray)
    })
}
// function writeWhiteList(){
//     return fileReader.readFileAsArray('./src/ipLists/ipWhitelist.txt')
// }

function readBlackList(cb: any){
    fileReader.readFileAsArray('./src/ipLists/ipBlacklist.txt', (dataArray: string[])=>{
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