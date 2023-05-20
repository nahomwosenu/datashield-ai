const mongoose = require('mongoose');
const crypto = require('crypto');
const ECSMID = require('./ECSMID');
let token="";
// Define a custom data type for encrypted strings
module.exports=class EncryptedNumber extends mongoose.SchemaType {
    constructor(key, options) {
        super(key, options, 'EncryptedNumber');
        this.ecsmid=new ECSMID(EncryptedNumber.getToken());
    }

    // Cast the value to a buffer before encryption
    cast(val) {
        let value = val;
        if (typeof val == 'bigint' || typeof val == 'number') {
            value=this.ecsmid.encryptString(value.toString());
            //console.log("casted value: ",value);
            return Buffer.from(value, 'utf8');
        }else{
            return Number(this.ecsmid.decryptString(value.toString('utf8')));
        }
        //return "casted";

    }

    // Encrypt the value using the algorithm and key
    encrypt(value) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        const encrypted = cipher.update(value);
        return Buffer.concat([iv, encrypted, cipher.final()]);
    }

    // Decrypt the value using the algorithm and key
    decrypt(value) {
        const iv = value.slice(0, 16);
        const encrypted = value.slice(16);
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        const decrypted = decipher.update(encrypted);
        return Buffer.concat([decrypted, decipher.final()]).toString('utf8');
    }

    // Override the set method to encrypt the value before saving
    set = val => {
        return "set_called";//this.encrypt(this.cast(val));
    };

    // Override the get method to decrypt the value after retrieving
    get(val){
        return "get_called";//this.decrypt(val);
    };
    checkRequired(val) {
        return true;
    }

    static setToken(t){
        token=t;
    }
    static getToken(){
        return token;
    }
}