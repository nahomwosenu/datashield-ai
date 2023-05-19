// Require mongoose and assert modules
const DatashieldMongoose=require('./DataShieldMongoose');
const assert = require('assert');
// Define a sample schema for objects
const tempToken="MRgJDi4FYTAlFScDNQJEeRc/dQcrXxYwOzYKPCcrJFQ5NglwDVFqAjUSQzwjMTIA.Gx4OAD5/dg46bzpBOn4fCRQnaQcrQXJEF2goOjwbJhYUJBYBNVFyQzoqWz0iOyAMNRgNfABYaTEqFSMwOn8uBRscIAcpCnY/GBUjEjUCB2gCbQkgOH92JTpsORMaKzhWAgN1AC9Rchs6Kl0vOjkzeQQ5FgE2QWoYOioeOjsrOGwbHgIANHdPMCMVJwA1BDlx.XMS8xKbDq1vCry3DhMSPw4NcxIpBxLTDrcK1wqRE";
const ds=new DatashieldMongoose(tempToken);
const SampleSchema = new ds.mongoose.Schema({
    first_name: ds.EncryptedString,
    last_name: ds.EncryptedString,
    email: String,
    age: Number,
    hobbies: [String]
});

// Create a model for the schema
const SampleModel = ds.mongoose.model('Sample', SampleSchema);

// Connect to the database
ds.mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// Create a sample object
const sample1 = new SampleModel({
    _id: new ds.mongoose.Types.ObjectId(3),
    name: 'Alice',
    age: 25,
    hobbies: ['reading', 'writing', 'cooking']
});

// Insert the object to the database
sample1.save()
    .then((result)=>{
        console.log("saved sample1",result);
    })
    .catch((err)=>{console.log(err)});

// Read the object from the database
SampleModel.findOne({age: '25'})
    .then((result)=>{
        console.log("find-one",result);
    })
    .catch((err)=>{console.log(err);});
