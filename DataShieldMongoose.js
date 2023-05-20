const mongoose = require("mongoose");
const EncryptedString = require("./EncryptedString");
const EncryptedArray = require("./EncryptedArray");
const EncryptedNumber = require("./EncryptedNumber");

module.exports = class DataShieldMongoose{
    constructor(token) {
        this.token=token;
        this.mongoose=mongoose;
        this.mongoose.Schema.Types.EncryptedString = EncryptedString;
        this.mongoose.Schema.Types.EncryptedArray = EncryptedArray;
        this.mongoose.Schema.Types.EncryptedNumber = EncryptedNumber;
        this.EncryptedString=EncryptedString;
        this.EncryptedString.setToken(token);
        this.EncryptedArray=EncryptedArray;
        this.EncryptedArray.setToken(token);
        this.EncryptedNumber=EncryptedNumber;
        this.EncryptedNumber.setToken(token);
    }
}