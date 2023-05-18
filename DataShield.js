// Import Knex and crypto modules
const Knex = require('knex');
const crypto = require('crypto');
const ecsmid = require("./ECSMID");

// Define a custom class that wraps Knex
class DataShield {
    // Define a constructor that takes the connection and the encrypted columns as options
    constructor(options) {

        // Create an instance of Knex with the connection options
        this.knex = new Knex(options.connection);

        // Store the encrypted columns and the key as properties
        this.encryptedColumns = options.encryptedColumns || [];
        this.token=options.token;
    }

    // Define a method to encrypt the specified columns in an object
    async encrypt(data) {
        console.log('###########################>encrypting data', data);
        let promise = new Promise((resolve, reject) => {
            const encryptedColumns = data;

            const ecs = new ecsmid(this.token);
            const columnData = [];
            for (const column of this.encryptedColumns) {
                if (data[column]) {
                    columnData.push(data[column]);
                }
            }
            ecs.encryptArray(columnData).then((encryptedData) => {
                this.encryptedColumns.forEach((column, index) => {
                    data[column] = encryptedData.data[index];
                });
                resolve(data);
            })
                .catch((err) => {
                    console.log('err', err);
                    reject(err);
                });
        });
        return promise;
    }

    // Define a method to decrypt the specified columns in an object
    async decrypt(data) {
        console.log('###########################>decrypting data', data);
        return new Promise((resolve, reject) => {
            const ecs = new ecsmid(this.token);
            const columnData = [];
            for (const column of this.encryptedColumns) {
                if (data[column]) {
                    columnData.push(data[column]);
                }
            }
            ecs.decryptArray(columnData).then((decryptedData) => {
                this.encryptedColumns.forEach((column, index) => {
                    data[column] = decryptedData.data[index];
                });
                resolve(data);
            })
                .catch((err) => {
                    console.log('err', err);
                    reject(err);
                });
        });
    }

    // Define a method to insert data into a table and encrypt the specified columns
    async insert(table, data, encryptedColumns=[]) {
        // Encrypt the data object
        this.encryptedColumns=encryptedColumns;
        await this.encrypt(data).then((encryptedData) => {
            // Call the knex insert method with the table and the encrypted data
            return this.knex(table).insert(encryptedData);
        }).catch((err) => {
            console.log('err', err);
        });
    }

    // Define a method to select data from a table and decrypt the specified columns
    async select(table, ...args) {
        /*// Call the knex select method with the table and the arguments
        const rows = await this.knex(table).select(...args);

        // Decrypt each row object
        const decryptedRows = await rows.map(async (row) => await this.decrypt(row).then((decryptedRow) => {
            return decryptedRow;
        }).catch((err) => {
            console.log('err', err);
        }));

        // Return the decrypted rows array
        return decryptedRows;*/
        return new Promise((resolve, reject) => {
            this.knex(table).select(...args).then((rows) => {
                const decryptedRows = [];
                rows.forEach((row) => {
                    this.decrypt(row).then((decryptedRow) => {
                        decryptedRows.push(decryptedRow);
                        if (decryptedRows.length === rows.length) {
                            resolve(decryptedRows);
                        }
                    }).catch((err) => {
                        console.log('err', err);
                        reject(err);
                    });
                });
            }).catch((err) => {
                console.log('err', err);
                reject(err);
            });
        });
    }

    // Define a method to expose other knex methods that do not need encryption or decryption
    query() {
        // Return the knex instance
        return this.knex;
    }
}

// Export the custom class
module.exports = DataShield;
