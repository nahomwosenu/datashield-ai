// Import the custom class and the assert module
const DataShield = require('./DataShield');
const assert = require('assert');

// Set the encryption key as an environment variable
process.env.ENCRYPTION_KEY = 'secret';

// Create an instance of the custom class with the mysql connection and the encrypted columns
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
    token: "Lg0WLDwpGi0mKwkNEjcJeTkQaSw7BjECGAUJPC4uDXg4JwkdIVo4KiAmAgwPIl4A.ITYMPS4mOkIjfyIaEnIARy4IEi0/BFstPjsVBRJzIXAhcC44HwckLT9wCS81fShOLgggLTgEHiwlehYNCSYwTCFxNlAuJhNaLARucRJzBXk9JwkvLiRDLSI7CSsdDAV5PhB/IjceOzo3OxEiEnILTjM3FQkuJjgtJ3AJMhJzFXknLT5fGlUnDSN9CC8=.w5XEr8OZw7HEtlXElnxgInR9w5dExK3CpkjFgQ=="
});

// Define some sample data to insert
const sampleData = [
    {  name: 'Alice', email: 'alice@example.com', age: 25 },
    {  name: 'Bob', email: 'bob@example.com', age: 30 },
    {  name: 'Charlie', email: 'charlie@example.com', age: 35 }
];

// Define a function to run the test
async function runTest() {
    try {

        await dataShield.query().schema.createTable('users', (table) => {
            table.increments('id');
            table.string('name');
            table.string('email');
            table.integer('age');
        });

        // Insert the sample data into the table
        for (const data of sampleData) {
            await dataShield.insert('users', data, ['name', 'email']);
        }

        // Retrieve the data from the table
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


        // Print a success message
        console.log('Test passed');
    } catch (error) {
        // Print an error message
        console.error('Test failed:', error.message);
    } finally {
        // Drop the table and destroy the connection
        //await knex.query().schema.dropTable('users');
        dataShield.query().schema.dropSchema()
        await dataShield.query().destroy();
    }
}

// Run the test
runTest();
