// Require mongoose and assert modules
const DatashieldMongoose=require('./DataShieldMongoose');
const assert = require('assert');
// Define a sample schema for objects
const tempToken="MRgJDi4FYTAlFScDNQJEeRc/dQcrXxYwOzYKPCcrJFQ5NglwDVFqAjUSQzwjMTIA.Gx4OAD5/dg46bzpBOn4fCRQnaQcrQXJEF2goOjwbJhYUJBYBNVFyQzoqWz0iOyAMNRgNfABYaTEqFSMwOn8uBRscIAcpCnY/GBUjEjUCB2gCbQkgOH92JTpsORMaKzhWAgN1AC9Rchs6Kl0vOjkzeQQ5FgE2QWoYOioeOjsrOGwbHgIANHdPMCMVJwA1BDlx.XMS8xKbDq1vCry3DhMSPw4NcxIpBxLTDrcK1wqRE";
const ds=new DatashieldMongoose(tempToken);
const SampleSchema = new ds.mongoose.Schema({
    name: ds.EncryptedString,
    email: String,
    age: Number,
    hobbies: ds.EncryptedArray
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

const travellersSchema = new ds.mongoose.Schema({
    first_name: ds.EncryptedString,
    last_name: ds.EncryptedString,
    email: String,
    gender: ds.EncryptedString,
    tickets: ds.EncryptedArray,
    age: ds.EncryptedNumber
});
const travellerModel = ds.mongoose.model('travellers',travellersSchema);

const travellersList=
    [{"first_name":"Beauregard","last_name":"Puddin","email":"bpuddin0@vimeo.com","gender":"Male","tickets":["847290838-0","478716182-2","175905738-X"],"age":74},
        {"first_name":"Keith","last_name":"Roony","email":"kroony1@apple.com","gender":"Male","tickets":["953603471-9","039385190-7","258716913-5"],"age":91},
        {"first_name":"Oliy","last_name":"O'Hoey","email":"oohoey2@purevolume.com","gender":"Female","tickets":["284428972-X","806887472-0","866496655-9"],"age":49},
        {"first_name":"Ely","last_name":"Shurrocks","email":"eshurrocks3@delicious.com","gender":"Male","tickets":["662643198-6","446770507-4","786803969-8"],"age":30},
        {"first_name":"Arri","last_name":"Slaney","email":"aslaney4@fda.gov","gender":"Male","tickets":["576963491-X","210230669-0","733531363-5"],"age":70},
        {"first_name":"Laurence","last_name":"Sango","email":"lsango5@nydailynews.com","gender":"Male","tickets":["433995356-3","169805709-1","330720995-7"],"age":65},
        {"first_name":"Artemus","last_name":"Andretti","email":"aandretti6@comsenz.com","gender":"Male","tickets":["076836116-8","090614256-3","333246178-8"],"age":79},
        {"first_name":"Colly","last_name":"Motherwell","email":"cmotherwell7@163.com","gender":"Female","tickets":["963224058-8","791672575-4","738364386-0"],"age":40},
        {"first_name":"Aldo","last_name":"Calverd","email":"acalverd8@chronoengine.com","gender":"Male","tickets":["235884672-4","950635337-9","545731615-7"],"age":84},
        {"first_name":"Reilly","last_name":"Voller","email":"rvoller9@opensource.org","gender":"Agender","tickets":["614082973-9","798154086-0","734844951-4"],"age":75},
        {"first_name":"Kimberlee","last_name":"Bessell","email":"kbessella@geocities.com","gender":"Female","tickets":["715627893-2","737998886-7","578264246-7"],"age":58},
        {"first_name":"Gregor","last_name":"Combe","email":"gcombeb@pbs.org","gender":"Male","tickets":["380789476-4","795412558-0","029475960-3"],"age":42},
        {"first_name":"Gib","last_name":"Matussow","email":"gmatussowc@slate.com","gender":"Male","tickets":["449489528-8","677681760-X","231248321-1"],"age":96},
        {"first_name":"Caesar","last_name":"Meedendorpe","email":"cmeedendorped@newsvine.com","gender":"Male","tickets":["825139295-0","275779970-3","413669815-1"],"age":91},
        {"first_name":"Mandie","last_name":"Fraine","email":"mfrainee@bravesites.com","gender":"Female","tickets":["619131524-4","242106602-6","101212633-1"],"age":87},
        {"first_name":"Abrahan","last_name":"Selvey","email":"aselveyf@blogtalkradio.com","gender":"Genderqueer","tickets":["757964649-8","716118984-5","407783861-4"],"age":94},
        {"first_name":"Lulita","last_name":"Chevolleau","email":"lchevolleaug@smh.com.au","gender":"Female","tickets":["840947137-X","286139216-9","444697766-0"],"age":22},
        {"first_name":"Emlyn","last_name":"Berthe","email":"ebertheh@patch.com","gender":"Male","tickets":["989713860-9","510056726-0","922773373-6"],"age":20},
        {"first_name":"Betta","last_name":"Pautot","email":"bpautoti@scribd.com","gender":"Female","tickets":["586169649-7","763421232-6","900988785-5"],"age":68},
        {"first_name":"Quill","last_name":"Blase","email":"qblasej@newsvine.com","gender":"Male","tickets":["545670832-9","092035842-X","929427539-6"],"age":71},
        {"first_name":"Kaleb","last_name":"Duxbury","email":"kduxburyk@mayoclinic.com","gender":"Male","tickets":["535894072-3","291064719-6","222357485-8"],"age":21},
        {"first_name":"Nowell","last_name":"Breadmore","email":"nbreadmorel@businesswire.com","gender":"Male","tickets":["524672990-7","617437355-X","932599001-6"],"age":35},
        {"first_name":"Mayer","last_name":"Thornton","email":"mthorntonm@unicef.org","gender":"Male","tickets":["236923196-3","180137843-6","483872691-0"],"age":84},
        {"first_name":"Kaitlin","last_name":"Ribou","email":"kriboun@bravesites.com","gender":"Female","tickets":["078602386-4","924643721-7","795233165-5"],"age":66},
        {"first_name":"Nessa","last_name":"Merrikin","email":"nmerrikino@irs.gov","gender":"Female","tickets":["990899743-2","059792140-7","912493147-0"],"age":48},
        {"first_name":"Coretta","last_name":"Durand","email":"cdurandp@naver.com","gender":"Agender","tickets":["435036848-5","165057676-5","866018589-7"],"age":53},
        {"first_name":"Alphard","last_name":"Canland","email":"acanlandq@whitehouse.gov","gender":"Male","tickets":["182545458-2","614023977-X","901565326-7"],"age":88},
        {"first_name":"Rowan","last_name":"Flemyng","email":"rflemyngr@salon.com","gender":"Male","tickets":["327993987-9","566724192-7","278589278-X"],"age":97},
        {"first_name":"Turner","last_name":"Burkert","email":"tburkerts@barnesandnoble.com","gender":"Male","tickets":["600395686-0","902640750-5","734717161-X"],"age":79},
        {"first_name":"Karita","last_name":"Riggey","email":"kriggeyt@devhub.com","gender":"Female","tickets":["020193554-6","476590145-9","431934551-7"],"age":82},
        {"first_name":"Bernardina","last_name":"Boakes","email":"bboakesu@businesswire.com","gender":"Female","tickets":["066291335-3","154447470-9","503621294-0"],"age":57},
        {"first_name":"Simona","last_name":"Durber","email":"sdurberv@vistaprint.com","gender":"Female","tickets":["575265085-2","852054612-9","573530972-2"],"age":18},
        {"first_name":"Noble","last_name":"Dei","email":"ndeiw@flickr.com","gender":"Male","tickets":["812603537-4","546138411-0","749577277-8"],"age":73},
        {"first_name":"Wendie","last_name":"Stocking","email":"wstockingx@prweb.com","gender":"Female","tickets":["454293320-2","373629300-3","171298008-4"],"age":30},
        {"first_name":"Delinda","last_name":"Carillo","email":"dcarilloy@msn.com","gender":"Genderqueer","tickets":["439714838-4","442527329-X","241237075-3"],"age":20},
        {"first_name":"Merci","last_name":"Gribble","email":"mgribblez@wisc.edu","gender":"Female","tickets":["735655860-2","667068729-X","769779715-1"],"age":64},
        {"first_name":"Jard","last_name":"Fancy","email":"jfancy10@wiley.com","gender":"Male","tickets":["917268468-2","859051949-X","289006068-3"],"age":66},
        {"first_name":"Maridel","last_name":"Bengall","email":"mbengall11@census.gov","gender":"Female","tickets":["515418037-2","740014454-5","679747484-1"],"age":70},
        {"first_name":"Doria","last_name":"Tewkesberry","email":"dtewkesberry12@nationalgeographic.com","gender":"Female","tickets":["291516247-6","740813569-3","581952869-7"],"age":27},
        {"first_name":"Urbano","last_name":"McIlrath","email":"umcilrath13@census.gov","gender":"Male","tickets":["616343156-1","163014436-3","247637327-3"],"age":80},
        {"first_name":"Eda","last_name":"Sugarman","email":"esugarman14@ycombinator.com","gender":"Female","tickets":["779025763-3","690979174-6","659312296-3"],"age":33},
        {"first_name":"Ardis","last_name":"Filipputti","email":"afilipputti15@plala.or.jp","gender":"Female","tickets":["469291261-8","807139511-0","779334258-5"],"age":99},
        {"first_name":"Dexter","last_name":"Rudolfer","email":"drudolfer16@blogger.com","gender":"Male","tickets":["275819855-X","843278589-X","254852208-3"],"age":96},
        {"first_name":"Jandy","last_name":"Sawden","email":"jsawden17@multiply.com","gender":"Female","tickets":["193294958-5","591574474-5","995023931-1"],"age":89},
        {"first_name":"Darbie","last_name":"Issett","email":"dissett18@google.ru","gender":"Female","tickets":["474584558-8","376319942-X","339915602-2"],"age":86},
        {"first_name":"Coleen","last_name":"Kybbye","email":"ckybbye19@jimdo.com","gender":"Female","tickets":["594897134-1","427049326-7","245997942-8"],"age":30},
        {"first_name":"Evvie","last_name":"Lowater","email":"elowater1a@domainmarket.com","gender":"Female","tickets":["774435551-2","820283965-3","649919700-9"],"age":91},
        {"first_name":"Godfry","last_name":"Ruller","email":"gruller1b@ezinearticles.com","gender":"Male","tickets":["036890116-5","442573862-4","295430860-5"],"age":67},
        {"first_name":"Deane","last_name":"Spinozzi","email":"dspinozzi1c@boston.com","gender":"Male","tickets":["192608688-0","415306596-X","052238580-X"],"age":74},
        {"first_name":"Artur","last_name":"Hopfer","email":"ahopfer1d@admin.ch","gender":"Male","tickets":["215338062-6","177509745-5","713487846-5"],"age":52}];

console.log('saving travellers, size: '+travellersList.length);
(async()=>{
    for(let i=0;i<travellersList.length;i++){
        await new travellerModel(travellersList[i]).save()
            .then((result)=>{})
            .catch((err)=>console.log(err));
    }
    travellerModel.find({})
        .then((result)=>{
            //console.log('results',result);
            for(let i=0;i<result.length;i++){
                let travellerFromDB=result[i];
                let traveller=travellersList[i];
                assert.equal(travellerFromDB.first_name,traveller.first_name);
                assert.equal(travellerFromDB.last_name,traveller.last_name);
                assert.equal(travellerFromDB.gender,traveller.gender);
                console.log('comparing original/db',traveller.tickets,travellerFromDB.tickets);
                assert.deepEqual(travellerFromDB.tickets,traveller.tickets);
                assert.equal(travellerFromDB.age,traveller.age);
            }
            console.log('all '+result.length+' tests passed');
        })
})();



