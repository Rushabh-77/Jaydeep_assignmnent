const CONFIG = require('../config');
const CryptoJS = require("crypto-js");

exports.encrypt = (text) => {
    let cipher = CryptoJS.AES.encrypt(text, CONFIG.encrypt).toString();
    return cipher;
}
exports.decrypt = (cipher) => {
    let decipher = CryptoJS.AES.decrypt(cipher, CONFIG.encrypt).toString(CryptoJS.enc.Utf8);
    return decipher;
}
