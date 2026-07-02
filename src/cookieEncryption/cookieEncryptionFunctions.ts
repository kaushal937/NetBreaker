import { fitstar, fitstarUnlock } from "../fitstar/fitstar";
import setCookieParser from 'set-cookie-parser';
import * as cookie from 'cookie';

function encryptCookie(response: any, cipherKey: string){
    const modifiedSetCookieHeader = response.headers.getSetCookie().map((header: any) => {
            const parsed = setCookieParser.parseSetCookie(header)[0];

            parsed.value = fitstar(parsed.value, cipherKey)

            return cookie.serialize(parsed.name, parsed.value, {
                path: parsed.path,
                domain: parsed.domain,
                expires: parsed.expires,
                maxAge: parsed.maxAge,
                secure: parsed.secure,
                httpOnly: parsed.httpOnly,
                sameSite: parsed.sameSite?.toLowerCase() as "lax" | "strict" | "none",
            });
        });
        return modifiedSetCookieHeader
}

function returnOutgoingCookiesAsNoChange(response: any){
    const modifiedSetCookieHeader = response.headers.getSetCookie().map((header: any) => {
            const parsed = setCookieParser.parseSetCookie(header)[0];

            return cookie.serialize(parsed.name, parsed.value, {
                path: parsed.path,
                domain: parsed.domain,
                expires: parsed.expires,
                maxAge: parsed.maxAge,
                secure: parsed.secure,
                httpOnly: parsed.httpOnly,
                sameSite: parsed.sameSite?.toLowerCase() as "lax" | "strict" | "none",
            });
        });
        return modifiedSetCookieHeader
}

function decryptCookie(cookie: any, cipherKey: string){
    Object.entries(cookie).forEach(([key, value]) => {
        cookie[key] = fitstarUnlock(cookie[key], cipherKey)
    });

    return cookie
}

export {
    encryptCookie,
    decryptCookie,
    returnOutgoingCookiesAsNoChange
}