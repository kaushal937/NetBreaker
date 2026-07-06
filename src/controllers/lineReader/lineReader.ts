import fs from 'fs'

function readFileAsArray(path: string, cb: any){
    fs.readFile(path, "utf-8", (err: NodeJS.ErrnoException | null, data: string)=>{
        if(data){
            let val = data.split(/\r\n|\n/)
            cb(val)
        }else if(err){
            cb("err")
        }
    })
}

export default {
    readFileAsArray
}