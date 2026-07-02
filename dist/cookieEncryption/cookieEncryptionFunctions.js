"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptCookie = encryptCookie;
exports.decryptCookie = decryptCookie;
exports.returnOutgoingCookiesAsNoChange = returnOutgoingCookiesAsNoChange;
const fitstar_1 = require("../fitstar/fitstar");
const set_cookie_parser_1 = __importDefault(require("set-cookie-parser"));
const cookie = __importStar(require("cookie"));
function encryptCookie(response, cipherKey) {
    const modifiedSetCookieHeader = response.headers.getSetCookie().map((header) => {
        const parsed = set_cookie_parser_1.default.parseSetCookie(header)[0];
        parsed.value = (0, fitstar_1.fitstar)(parsed.value, cipherKey);
        return cookie.serialize(parsed.name, parsed.value, {
            path: parsed.path,
            domain: parsed.domain,
            expires: parsed.expires,
            maxAge: parsed.maxAge,
            secure: parsed.secure,
            httpOnly: parsed.httpOnly,
            sameSite: parsed.sameSite?.toLowerCase(),
        });
    });
    return modifiedSetCookieHeader;
}
function returnOutgoingCookiesAsNoChange(response) {
    const modifiedSetCookieHeader = response.headers.getSetCookie().map((header) => {
        const parsed = set_cookie_parser_1.default.parseSetCookie(header)[0];
        return cookie.serialize(parsed.name, parsed.value, {
            path: parsed.path,
            domain: parsed.domain,
            expires: parsed.expires,
            maxAge: parsed.maxAge,
            secure: parsed.secure,
            httpOnly: parsed.httpOnly,
            sameSite: parsed.sameSite?.toLowerCase(),
        });
    });
    return modifiedSetCookieHeader;
}
function decryptCookie(cookie, cipherKey) {
    Object.entries(cookie).forEach(([key, value]) => {
        cookie[key] = (0, fitstar_1.fitstarUnlock)(cookie[key], cipherKey);
    });
    return cookie;
}
