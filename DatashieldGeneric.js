const ECSMID = require("./ECSMID");
module.exports = class DataShieldGeneric{
    constructor(API_KEY=null) {
        if(API_KEY){
            this.token=API_KEY;
            this.ecsmid=new ECSMID(this.token);
        }else{
            throw new Error('Error: please provide a valid license key');
        }
    }
    async encryptString(plainText){
        return new Promise((resolve, reject)=>{
            this.ecsmid.encryptGeneric(plainText)
                .then((response)=>{
                    if(response.status==='success'){
                        resolve(response.cipher_text);
                    }else{
                        reject('Error: an error occurred while encrypting '+plainText);
                    }
                })
                .catch((err)=>{
                    reject(err);
                });
        });
    }
    async decryptString(cipherText){
        return new Promise((resolve, reject)=>{
            this.ecsmid.decryptGeneric(cipherText)
                .then((response)=>{
                    if(response.status==='success'){
                        resolve(response.text);
                    }else{
                        reject('Error: an error occurred while decrypting '+cipherText);
                    }
                })
                .catch((err)=>{
                    reject(err);
                });
        });
    }
    async encryptArray(data=[]){
        return new Promise<[]>((resolve, reject)=>{
            this.ecsmid.encryptArray(data).then((response) => {
                if(response.status==='success'){
                    resolve(response.data);
                }else{
                    reject('Error: encryption failed');
                }
            }).catch(err=>reject(err));
        });
    }
    async decryptArray(data=[]){
        return new Promise<[]>((resolve, reject)=>{
            this.ecsmid.decryptArray(data).then((response) => {
                if(response.status==='success'){
                    resolve(response.data);
                }else{
                    reject('Error: decryption failed');
                }
            }).catch(err=>reject(err));
        });
    }
}