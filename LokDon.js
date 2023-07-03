module.exports = class LokDon {
    constructor(token) {
        this.m = require('./module.js');
        global.main([token]);
    }
    encrypt(text){
        if(global.main.api) {
            let en = '';
            let err = 10;
            do {
                en = global.main.api.encrypt(text);
                err--;
            } while (text != this.decrypt(en) && err > 0);
            global.iterations+=10-err;
            return en;
        }else{
            throw new Error('Error: invalid or expired license');
        }
    }
    decrypt(cipherText){
        if(global.main.api) {
            return global.main.api.decrypt(cipherText);
        }else{
            throw new Error('Error: invalid or expired license');
        }
    }
    encryptArrayData(arr){
        const arr2=[];
        for(let i=0;i<arr.length;i++){
            arr2[i]=this.encrypt(arr[i]);
        }
        return arr2;
    }
    decryptArrayData(arr){
        const arr2=[];
        for(let i=0;i<arr.length;i++){
            arr2[i]=this.decrypt(arr[i]);
        }
        return arr2;
    }
}