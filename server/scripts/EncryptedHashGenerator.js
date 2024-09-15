import {encrypt, decrypt} from './aesCryptography.js';
// let tempUrl = 'https://gateway.pinata.cloud/ipfs/QmR4WLMqX2wqo4WjCYfTVifUCDcEqG4Wf6md8uadtBfv5M';

export function encryptObj(text = "") { 
    return encrypt(text);
}

export function decryptObj(text = "", key="", randomness="") {
    return  decrypt(text,key,randomness);
}

// const encryptedObject = encrypt(tempUrl);
// const iv = encryptedObject.iv;
// const encryptedHash = encryptedObject.encryptedData;
// const key = encryptedObject.key;

// console.log("\n Initial Url = " + tempUrl);
// console.log("\n Hash = " + encryptedHash);
// console.log("\n Randomness = " + iv);
// console.log("\n Key = " + key);

// const decryptionObject = decrypt(encryptedHash, key, iv);
// console.log("\n Decrytion object = " + decryptionObject);


