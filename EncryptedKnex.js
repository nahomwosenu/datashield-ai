// Import Knex and crypto modules
const Knex = require('knex');
const crypto = require('crypto');
const ecsmid = require('./ECSMID');
const tempToken='NwQCDBARU3Enfgl6EysAShlwPyg2LDxxJlAVCyEmCX45JgILFgg3DCUGDg4pLE4A.HAU/KSt9L1glBBIIKSA4Uzg6PX0+EEtxO2ccLyEhRnU4fSgMFTYrRip4YzkhNDt5KHA7Iik2N14qem0OKVU8Wjh8CgsUdQZwP2sAPCEkQH46CygKF30vTSVCMAksHjxcOH0Hfzw8UF0lBgx1AB48XDcDH38TcwhZKngDOSEnJ3gnOzs8KAg3Zw==.wqLDo17DuzBAw6PEo8OJxK/Dn8KlZ8Ogw402xJNM';

// Define a custom class that extends Knex
class EncryptedKnex extends Knex {
    // Override the insert method to encrypt the specified columns
    encryptedInsert(data) {
        console.log('###########################>encrypting data',data);
        let promise=new Promise((resolve,reject)=>{
            const encryptedColumns = this.client.config.encryptedColumns || [];

            const ecs=ecsmid(tempToken);
            const columnData=encryptedColumns.map((column)=>{
                return data[column];
            });
            ecs.encryptArray(columnData).then((encryptedData)=>{
                encryptedColumns.forEach((column,index)=>{
                    data[column]=encryptedData.data[index];
                });
                resolve(super.insert(data));
            })
                .catch((err)=>{
                    console.log('err',err);
                    reject(err);
                });
        });
        return promise;
    }

    // Override the select method to decrypt the specified columns
    select(...args) {
        // Get the encryption key from the environment variable
        const key = process.env.ENCRYPTION_KEY;
        if (!key) {
            throw new Error('Encryption key is not set');
        }

        // Get the columns to decrypt from the constructor options
        const encryptedColumns = this.client.config.encryptedColumns || [];

        // Call the original select method and map the results
        return super.select(...args).map((row) => {
            // Loop through the encrypted columns and decrypt them
            for (const column of encryptedColumns) {
                if (row[column]) {
                    // Split the column value by ':' to get the initialization vector and the encrypted value
                    const [iv, encrypted] = row[column].split(':');

                    // Create a decipher object with the key and the initialization vector
                    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'base64'));

                    // Decrypt the column value and decode it as utf8
                    const decrypted = decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8');

                    // Assign the decrypted value to the row object
                    row[column] = decrypted;
                }
            }

            // Return the modified row object
            return row;
        });
    }
}

// Export the custom class
module.exports = EncryptedKnex;
