import crypto from 'crypto';
import {simulateBB84} from './bb84.js';

const keysData = simulateBB84(1000);
let a = '';
for(let i= 0; i < 256; i++){
    
    a = a + keysData[i];
}


// Key and IV should be of the correct length for AES-256
const algorithm = 'aes-256-cbc';
const keyLength = 32; // AES-256 requires a 32-byte key
const ivLength = 16; // AES block size is 16 bytes

// Convert a buffer to a binary string
function bufferToBinaryString(buffer) {
    return Array.from(buffer)
        .map(byte => byte.toString(2).padStart(8, '0'))
        .join('');
}

// Convert a binary string to a buffer
function binaryStringToBuffer(binaryString) {
    const bytes = binaryString.match(/.{1,8}/g);
    return Buffer.from(bytes.map(byte => parseInt(byte, 2)));
}

// Generate key and IV
const key = crypto.randomBytes(keyLength);
// console.log( `given key is  ${key}`);
const iv = crypto.randomBytes(ivLength);

// Convert key and IV to binary strings
const keyBinaryString = a;
// console.log( `given keyBinary string is  ${keyBinaryString}`)
const ivBinaryString = bufferToBinaryString(iv);

// Encrypt function
export function encrypt(text) {
    const keyBuffer = binaryStringToBuffer(keyBinaryString);
    const ivBuffer = binaryStringToBuffer(ivBinaryString);
    let cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: ivBinaryString,
        key: keyBinaryString,
        encryptedData: encrypted
    };
}

// Decrypt function
export function decrypt(encryptedText, keyBinaryString, ivBinaryString) {
    const keyBuffer = binaryStringToBuffer(keyBinaryString);
    const ivBuffer = binaryStringToBuffer(ivBinaryString);
    let decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
const text = 'YashSharma';
const encrypted = encrypt(text);
// console.log('Encrypted:', encrypted);

const decrypted = decrypt(encrypted.encryptedData, encrypted.key, encrypted.iv);
// console.log('Decrypted:', decrypted);
// console.log(` encrypted text is ${encrypted.encryptedData}`);
