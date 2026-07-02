import * as crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

export function fitstar(text: string, encryptionKey: string): string {
    try{
        const ENCRYPTION_KEY: Buffer = Buffer.from(encryptionKey); 
        const iv: Buffer = crypto.randomBytes(IV_LENGTH);
    
        const cipher: crypto.CipherGCM = crypto.createCipheriv(
            ALGORITHM, 
            ENCRYPTION_KEY, 
            iv
        ) as crypto.CipherGCM;
    
        let encrypted: string = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
    
        const authTag: Buffer = cipher.getAuthTag();
    
        return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    }catch(e){
        return `undefined`;
    }
}

export function fitstarUnlock(encryptedPayload: string, encryptionKey: string): string {
    try{
        const ENCRYPTION_KEY: Buffer = Buffer.from(encryptionKey); 

        const [ivHex, authTagHex, encryptedText] = encryptedPayload.split(':');
    
        if (!ivHex || !authTagHex || !encryptedText) {
            return `IEPF`;
            //throw new Error('Invalid encrypted payload format');
        }
    
        const iv: Buffer = Buffer.from(ivHex, 'hex');
        const authTag: Buffer = Buffer.from(authTagHex, 'hex');
    
        // Explicitly typed as DecipherGCM to expose .setAuthTag()
        const decipher: crypto.DecipherGCM = crypto.createDecipheriv(
            ALGORITHM, 
            ENCRYPTION_KEY, 
            iv
        ) as crypto.DecipherGCM;
    
        decipher.setAuthTag(authTag);
    
        let decrypted: string = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
    
        return decrypted;
    }catch(e){
        return encryptedPayload;
    }
}