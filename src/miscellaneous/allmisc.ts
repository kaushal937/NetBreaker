import os from 'os';

const sleep = async (milliseconds:number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
    });
};

function breakline(){
    if(os.platform() == "win32"){
        return "\r\n"
    }else{
        return "\r"
    }
}

function boolToNumber(booleanValue: boolean){
    (booleanValue == true)? 1 :  0
}
 
export default {
    breakline,
    sleep,
    boolToNumber
}