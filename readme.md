# ![DataShield AI](https://lokdon.com/wp-content/uploads/2023/05/newNew_dataShieldAI.png)
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
        client: '<db_driver eg. mysql>',
        connection: {
            host: '<db-server eg. localhost>',
            user: '<db-user eg. root>',
            password: '<db-pass>',
            database: '<schema-name>'
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

# Using DataShield with nosql databases
## Instructions for MongoDB
DataShield uses mongoose to connect to MongoDB and perform schema related operations.

1. To get started, simply install the datashield node package
```shell
npm install @lokdonllc/datashield
```

2. import the `DatashieldMongoose` module into your node script.

```js
const DatashieldMongoose=require('DataShieldMongoose');
```

3. Initialize Datashield with your API token
```js
const ds=new DatashieldMongoose(<YOUR_API_TOKEN>);
```

4. Connect to your MongoDB instance using mongoose & datshield
```js
ds.mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
```
You can use this `ds.mongoose` instance exactly as the mongoose library. 

### Creating encrypted schemas
Datashield provides encrypted schema types for mongoose. The following encrypted schema types have been tested well and available for production use in this release of datashield

* **EncryptedString**: This type supports encryption & decryption of any string type including JS objects that implement `toString`
* **EncryptedNumber**: This type supports encryption & decryption of `number` & `bigint` values. Note that it always returns a `number` type once decrypted
* **EncryptedArray**: This type encrypts & decrypts javascript arrays. It currently only supports `String Arrays` with one dimension. e.g. `['apples','oranges', 'bananas']`

For example, let's create a schema which demonstrates the use of all the above schema types:

```js
// complete steps 1 - 4 above, so you have ds.mongoose instance
// let's create a schema for Travellers:
// specify the fields we want to encrypt based on their types
// make sure to avoid encrypting indexed values or properties which we later use for searching the object
// in this case email is a property we want to use later for searching
const travellersSchema = new ds.mongoose.Schema({
    first_name: ds.EncryptedString,
    last_name: ds.EncryptedString,
    email: String,
    gender: ds.EncryptedString,
    tickets: ds.EncryptedArray,
    age: ds.EncryptedNumber
});

// register the schema created above with mongoose
const travellerModel = ds.mongoose.model('travellers',travellersSchema);

// populate or prepare the traveller objects you want to save to db
const travellersList=
    [
        {"first_name":"Beauregard","last_name":"Puddin","email":"bpuddin0@vimeo.com","gender":"Male","tickets":["847290838-0","478716182-2","175905738-X"],"age":74},
        {"first_name":"Keith","last_name":"Roony","email":"kroony1@apple.com","gender":"Male","tickets":["953603471-9","039385190-7","258716913-5"],"age":91},
        {"first_name":"Oliy","last_name":"O'Hoey","email":"oohoey2@purevolume.com","gender":"Female","tickets":["284428972-X","806887472-0","866496655-9"],"age":49},
        {"first_name":"Ely","last_name":"Shurrocks","email":"eshurrocks3@delicious.com","gender":"Male","tickets":["662643198-6","446770507-4","786803969-8"],"age":30}
];

// iterate over each traveller from the list and save it to db
// datashield automatically encrypts the values before saving it to db based on the types you specify
for(let i=0;i<travellersList.length;i++){
    new travellerModel(travellersList[i]).save()
        .then((result)=>{})
        .catch((err)=>console.log(err));
}

// To retreive the objects from the database you can use the mongoose provided functions
// upon retreival, datashield automatically decrypts the values before returned in the promise
travellerModel.find({})
    .then((result)=>{
        console.log(result);
        for(let i=0;i<result.length;i++){
            let travellerFromDB=result[i];
            let traveller=travellersList[i];
            assert.equal(travellerFromDB.first_name,traveller.first_name);
            assert.equal(travellerFromDB.last_name,traveller.last_name);
            assert.equal(travellerFromDB.gender,traveller.gender);
            assert.deepEqual(travellerFromDB.tickets,traveller.tickets);
            assert.equal(travellerFromDB.age,traveller.age);
        }
        console.log('all '+result.length+' tests passed');
    })
```





### Using datashield with other schema types
** If you intend to encrypt a different data type than the above, you can easly do that by converting the object you are encrypting to a json string before encrypting & parsing the json string after decrypted**
example:
```js
// consider this is the object you want to encrypt using datasheild
let person={
    "first_name":"Brena",
    "email":"bcuffin6@bbc.co.uk",
    "age":45
};
// convert the personObject to string before encryption
const personToString=JSON.stringify(person);

// specify to use EncryptedString type for person in your schema
const userSchema = new ds.mongoose.Schema({
    person: ds.EncryptedString,
    username: String,
    password: ds.EncryptedString
});

//create the user model
const userModel = ds.mongoose.model('User',userSchema);

// create the user object
const userObj= new userModel({
    person: personToString,
    username: 'user1',
    password: '12345678'
});

// save the object to database
// datashield automatically encrypts the person & password fields before saving it to database
userObj.save();

// fetch the user data
userModel.findOne({username: 'user1'})
    .then((result)=>{
       // now that we have the decrypted user object
       // convert the json string for person property of the user object
        const user=result;
        user.person=JSON.parse(result.person);
    });

```

## Frequently Asked Questions (FAQ):
### 1. How does datashield work?
Datashield-AI uses the [LokDon 2048bit keyless quantum-resistant encryption algorithm]('https://lokdon.com) to encrypt your database. Datashield-AI works on row level, which means you can configure it to only encrypt a part of your data or all of your data.

### 2. How does datashield-AI protect my data?
Datashield-AI first encrypts your data before saving it to the database. It then decrypts the data when you fetch it from the database. This means that your data is always encrypted in the database and only decrypted when you actually need it.

### 3. How does datashield-AI protect my data from hackers?
Datashield-AI is designed to work with your backend code. This means that your data is encrypted before it is sent to the database. This means that even if a hacker gets direct access to your database, they will not be able to decrypt your data.

### 4. How does datashield-AI protect my data from my own employees?
Datashield-AI only decrypts data with the same instance you used to encrypt it. This means that even if your employees have access to your database, they will still not be able to decrypt your data.

### 5. How does datashield-AI prevents data leaks and security breaches?
Datashield-AI becomes your last line of defense against data leaks and security breaches. Datashield-AI ensures that the valuable part of your users' data is stored encrypted in your servers. This means, even if a data leak occurs due to a security breach from the application or network layers, your users' data will still be safe.


## Change logs:
### Version `1.0.4`
* fixed bug in encrypting objects
### Version `1.0.3`
* added support for encrypted arrays
* added support for encrypted numbers
* added support for encrypted objects
### Version `1.0.2`
* added more schema types
* added qucik-start-guide for mongoose
* added test cases to test_mongoose.js

### Version `1.0.1`
* added sample data for test
* added more tests, added custom schema type for mongoose
### Version `1.0.0-beta`
* added support for mongoose
* added support for sql based databases
* added test cases using mysql package


