# DataShield AI: Real-time Automated AI Enhanced Policy Based Encryption

## Introduction
This is the official node-js port of Datashield.AI SDK. This SDK is used to encrypt and decrypt data using the ECSMID API. The SDK is available for the following languages: 
- [Java](https://lokdon.com/data-shield/)
- [Kotlin](https://lokdon.com/data-shield/)
- [NodeJS](https://lokdon.com/data-shield/)

## Installation
```bash
npm install @lokdon/datashield
```

## Usage
Visit (https://lokdon.com/data-shield/) to get your license keys.
### Initializing the library
Import the DataShield class from the package and initialize it with the configuration. 
The configuration object contains the following properties:
```javascript
const { DataShield } = require('@lokdon/datashield');
const dataShield = new DataShield({
    connection: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'mock5'
        }
    },
    token: "<Your API Key>"
});
```

### Creating a table (for SQL based databases)
DataShield uses knex.js package to build sql queries internally. If your project is already based on knex.js, integration can be done with minimal refactoring
```js
await dataShield.query().schema.createTable('users', (table) => {
            table.increments('id');
            table.string('name');
            table.string('email');
            table.integer('age');
        });
```

### Inserting data/rows to sql table
To insert a data to a sql table using datashield, you need to pass the `TABLE_NAME`, `ROW_DATA` and `ENCRYPTED_COLUMNS_LIST` to the insert method
the format is `dataShield.insert(TABLE_NAME, DATA_ARRAY, COLUMNS_TO_ENCRYPT);`
the default value for `COLUMNS_TO_ENCRYPT` is [], which means all columns will be saved as plain text.
```js
// populate the data in a associative array
// the keys will be used as column names and the values are the data to be inserted
    const sampleData = [
    {  name: 'Alice', email: 'alice@example.com', age: 25 },
    {  name: 'Bob', email: 'bob@example.com', age: 30 },
    {  name: 'Charlie', email: 'charlie@example.com', age: 35 }
];
// specify which columns should be encrypted
const columnsToEncrypt=['name','email'];
// iterate through the data array and insert each row using datashield
// datashield automatically encrypts and stores the data with the appropriate character encoding
for (const data of sampleData) {
    await dataShield.insert('users', data, columnsToEncrypt);
}
```

### Retrieving data/rows from sql table
To retrieve rows from sql table datashield builds a select query with the arguments you specify and decrypts the previously encrypted columns
For example, the following code snippet generates a select query which returns the rows including those encrypted now decrypted.
```js
await dataShield.select('users')
            .then((data) => data.map((row) => {
                console.log('####> Retrieved row', row);
                return {
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    age: row.age
                };
            })).catch((err) => {
                console.log('####> Error', err);
            });
```


### Performing DDL queries
Performing DDL using datashield is straightforward
```js
// drops the users table from the schema
    dataShield.query().schema.dropTable('users');

// drops the schema in use
    dataShield.query().schema.dropSchema();
    
// 
```

