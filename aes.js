var CryptoJS = require("crypto-js");

var secret_key = "uI2ooxtwHeI6q69PS98fx9SWVGbpQohO";

export const to_Encrypt = (text) => {
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), secret_key).toString();
    return encrypted;

}

export const to_Decrypt=(cipher)=>{
    var decrypted=CryptoJS.AES.decrypt(cipher,secret_key);
    var decryptData=JSON.parse(decrypted.toString(CryptoJS.AES.utf8));
    return decryptData;
}