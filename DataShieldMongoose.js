const mongoose = require("mongoose");
const EncryptedString = require("./EncryptedString");

module.exports = class DataShieldMongoose{
    constructor(token) {
        this.token=token;
        this.mongoose=mongoose;
        this.mongoose.Schema.Types.EncryptedString = EncryptedString;
        this.EncryptedString=EncryptedString;
        this.EncryptedString.setToken(token);
    }
}