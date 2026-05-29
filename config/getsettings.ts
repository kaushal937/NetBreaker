import fs from "fs";
import path from "path";

interface Config{
    settingname: string;
    settingvalue: string;
}

let varlist:Config[] = [];

async function getsetting(name:string, cb:(err: NodeJS.ErrnoException | null, data: string | null) => void){
    if(varlist.length == 0){
        //settings are not initialized
        fs.readFile(path.join(__dirname, "./config.nb"), "utf-8", (err: NodeJS.ErrnoException | null, data: string | null)=>{
            if(data){
                let val = data.split(/\r\n|\n/)

            
                for(let i = 0; i < val.length; i++){
                    var orderpair
                    var temppair = val[i]?.split(/=/)
                    var key = temppair?.[0] ?? ""
                    orderpair = {
                        settingname: key,
                        settingvalue: temppair?.[1]
                    }

                    varlist.push(orderpair)

                }
                cb(null, varlist.find((item) => item.settingname == name)?.settingvalue.toString() ?? "not found")
            }else if(err){
                cb(err, null)
            }
        })
    }else{
        //when config data is loaded
        cb(null, varlist.find((item) => item.settingname == name)?.settingvalue.toString() ?? "not found")
    }
}

module.exports = {
    getsetting
}
export {getsetting}





//module is working fine but is not stress tested




//format:
//
// getsett("{settingname}", (err: NodeJS.ErrnoException | null, data: string | null)=>{
//     if(err){
//         do something
//     }else{
//         do something else
//     }
// })

//returns in string format