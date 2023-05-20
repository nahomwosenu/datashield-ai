const mongoose = require('mongoose');
const crypto = require('crypto');
const ECSMID = require('./ECSMID');
let token="";
// Define a custom data type for encrypted strings
module.exports=class EncryptedArray extends mongoose.SchemaType {
    constructor(key, options) {
        super(key, options, 'EncryptedArray');
        this.ecsmid=new ECSMID(EncryptedArray.getToken());
    }

    // Cast the value to a buffer before encryption
    cast(val) {
        let value = val;
        if (Array.isArray(val)) {
            //console.log('provided array',val);
            value=this.ecsmid.encryptArrayData(value);
            return Buffer.from(JSON.stringify(value),'utf8');
        }else{
            return this.ecsmid.decryptArrayData(JSON.parse(value.toString('utf8')));
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