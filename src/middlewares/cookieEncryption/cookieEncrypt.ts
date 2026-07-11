import CookieEncryptionModule from "../../cookieEncryption/cookieEncryptionFunctions";

function handleIncomingCookie(cipherKey: string, encryptOrNot: number){
    //decryption
    return (req: any, res: any, next: any)=>{
        if(encryptOrNot == 1){
            req.cookies = CookieEncryptionModule.decryptCookie(req.cookies, cipherKey)
        }
        next()
    }
}

function handleOutGoingCookie(response: any, cipherKey: string, encryptOrNot: number){
    //encryption
    if(encryptOrNot == 1){
        return CookieEncryptionModule.encryptCookie(response, cipherKey)
    }else{
        return CookieEncryptionModule.returnOutgoingCookiesAsNoChange(response)
    }
}

export default{
    handleIncomingCookie,
    handleOutGoingCookie
}