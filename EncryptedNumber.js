const mongoose = require('mongoose');
const crypto = require('crypto');
const ECSMID = require('./LokDon');
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
            value=this.ecsmid.encrypt(value.toString());
            //console.log("casted value: ",value);
            return Buffer.from(value, 'utf8');
        }else{
            return Number(this.ecsmid.decrypt(value.toString('utf8')));
        }
        //return "casted";

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