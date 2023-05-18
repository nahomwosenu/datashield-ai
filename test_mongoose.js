// Require mongoose and assert modules
const mongoose = require('mongoose');
const assert = require('assert');

// Define a sample schema for objects
const SampleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: [String]
});

// Create a model for the schema
const SampleModel = mongoose.model('Sample', SampleSchema);

// Connect to the database
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// Create a sample object
const sample1 = new SampleModel({
    name: 'Alice',
    age: 25,
    hobbies: ['reading', 'writing', 'cooking']
});

// Insert the object to the database
sample1.save(function(err, result) {
    // Check for errors
    if (err) {
        console.error(err);
    } else {
        // Log the result
        console.log('Inserted:', result);
        // Test that the object was inserted correctly
        assert.equal(result.name, 'Alice');
        assert.equal(result.age, 25);
        assert.deepEqual(result.hobbies, ['reading', 'writing', 'cooking']);
    }
});

// Read the object from the database
SampleModel.findOne({name: 'Alice'}, function(err, result) {
    // Check for errors
    if (err) {
        console.error(err);
    } else {
        // Log the result
        console.log('Found:', result);
        // Test that the object was read correctly
        assert.equal(result.name, 'Alice');
        assert.equal(result.age, 25);
        assert.deepEqual(result.hobbies, ['reading', 'writing', 'cooking']);
    }
});
