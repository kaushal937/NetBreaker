import { encryptCookie, decryptCookie, returnOutgoingCookiesAsNoChange } from "../../cookieEncryption/cookieEncryptionFunctions";

function handleIncomingCookie(cipherKey: string, encryptOrNot: number){
    //decryption
    return (req: any, res: any, next: any)=>{
        if(encryptOrNot == 1){
            req.cookies = decryptCookie(req.cookies, cipherKey)
        }
        next()
    }
}

function handleOutGoingCookie(response: any, cipherKey: string, encryptOrNot: number){
    //encryption
    if(encryptOrNot == 1){
        return encryptCookie(response, cipherKey)
    }else{
        return returnOutgoingCookiesAsNoChange(response)
    }
}

export {
    handleIncomingCookie,
    handleOutGoingCookie
}