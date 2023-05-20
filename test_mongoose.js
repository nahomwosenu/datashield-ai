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

const travellersSchema = new ds.mongoose.Schema({
    first_name: ds.EncryptedString,
    last_name: ds.EncryptedString,
    email: String,
    gender: ds.EncryptedString,
    travelled: ds.EncryptedArray,
    age: ds.EncryptedNumber
});
const travellerModel = ds.mongoose.model('travellers',travellersSchema);

const travellersList=[{"first_name":"Evvy","last_name":"Calles","email":"ecalles0@ifeng.com","gender":"Female","travelled":["Siaya","Tayasan","Jiantiao","Sukasenang","Álvares Machado"],"age":32},
    {"first_name":"Pearle","last_name":"Frostick","email":"pfrostick1@sina.com.cn","gender":"Female","travelled":["Otjimbingwe","Várzea de Sintra","Hexia","Santa Paz","Calibishie"],"age":36},
    {"first_name":"Crysta","last_name":"Alway","email":"calway2@csmonitor.com","gender":"Female","travelled":["Vukojevci","Kenamoen","Ikryanoye","Trŭn","Jembayan Hitam"],"age":22},
    {"first_name":"Johnny","last_name":"Claypoole","email":"jclaypoole3@cloudflare.com","gender":"Male","travelled":["Temandangjero","Kuttu","Desa Nasol","Plavy","Emin"],"age":33},
    {"first_name":"Gare","last_name":"Speeding","email":"gspeeding4@yolasite.com","gender":"Male","travelled":["Strání","Abucayan","Kloangpopot","Pakham","Merida"],"age":98},
    {"first_name":"Zara","last_name":"Hayley","email":"zhayley5@apple.com","gender":"Female","travelled":["Honghuatao","Clearwater","Tatebayashi","Tutong","Cruzília"],"age":91},
    {"first_name":"Herbie","last_name":"MacLachlan","email":"hmaclachlan6@wikia.com","gender":"Male","travelled":["Wangxian","Shensuo","Huangbu","La Sierpe","Mozhong"],"age":43},
    {"first_name":"Salomone","last_name":"Bickmore","email":"sbickmore7@dot.gov","gender":"Male","travelled":["Coruripe","Yokotemachi","Mīrpur Sakro","Gomel","Wonorejo"],"age":95},
    {"first_name":"Garvy","last_name":"Swiggs","email":"gswiggs8@instagram.com","gender":"Male","travelled":["Cangqian","Tukums","Paradela","Pasar","Havtsal"],"age":69},
    {"first_name":"Skipper","last_name":"Shearme","email":"sshearme9@pcworld.com","gender":"Male","travelled":["Jinshan","Bonebone","Želešice","Perpignan","Tasikona"],"age":100},
    {"first_name":"Linn","last_name":"Guillotin","email":"lguillotina@mapy.cz","gender":"Male","travelled":["Léo","Hepu","Piippola","El Obeid","Tucson"],"age":47},
    {"first_name":"Ludwig","last_name":"Mirralls","email":"lmirrallsb@chicagotribune.com","gender":"Male","travelled":["Guanxi","Baitu","Wantian","Klenica","Tarimbang"],"age":75},
    {"first_name":"Isabelle","last_name":"Lugton","email":"ilugtonc@princeton.edu","gender":"Female","travelled":["Kaulon","Donnycarney","Malata","Serikbuya","Torre"],"age":18},
    {"first_name":"Dorelia","last_name":"MacAirt","email":"dmacairtd@blinklist.com","gender":"Female","travelled":["Bor Ondor","Malbug","Beisijia","Yeghvard","Caicedonia"],"age":85},
    {"first_name":"Bradney","last_name":"Sargeant","email":"bsargeante@amazon.com","gender":"Male","travelled":["Queniquea","Aston","Gombe","Gulong","Mobile"],"age":35},
    {"first_name":"Bridie","last_name":"McCaw","email":"bmccawf@pbs.org","gender":"Female","travelled":["Haarlem","Las Flores","Balagon","Fruitvale","Bāsawul"],"age":22},
    {"first_name":"Hercule","last_name":"Tribell","email":"htribellg@netvibes.com","gender":"Male","travelled":["Dongshentou","Banqiaodian","Ágios Vasíleios","Calmar","Landvetter"],"age":48},
    {"first_name":"Daryl","last_name":"Reaveley","email":"dreaveleyh@fastcompany.com","gender":"Non-binary","travelled":["Mizusawa","Hejiang","Jiaoxiyakou","Walferdange","Haunubenak"],"age":81},
    {"first_name":"Brant","last_name":"Atherton","email":"bathertoni@woothemes.com","gender":"Male","travelled":["Valerianovsk","Tyrnyauz","Tiabaya","Yakovlevo","Smolenka"],"age":31},
    {"first_name":"Leo","last_name":"Gullivent","email":"lgulliventj@mashable.com","gender":"Male","travelled":["Chelbasskaya","Rybache","Bắc Kạn","Moose Jaw","Vavatenina"],"age":60},
    {"first_name":"Lynea","last_name":"Lonie","email":"lloniek@archive.org","gender":"Female","travelled":["Kaingiwa","Trångsund","Tongxing","Pleshanovo","Meziměstí"],"age":72},
    {"first_name":"Shurlocke","last_name":"Cozins","email":"scozinsl@pen.io","gender":"Male","travelled":["Goz Beïda","Krajan Tambakrejo","Krasne","Évry","Qumudi"],"age":21},
    {"first_name":"Emily","last_name":"Pardon","email":"epardonm@digg.com","gender":"Female","travelled":["Beregovoy","Hanyuan","Panenggoede","Cárdenas","Dagu"],"age":83},
    {"first_name":"Wilfred","last_name":"Culham","email":"wculhamn@goo.ne.jp","gender":"Male","travelled":["Ombarade","Klášterec nad Ohří","Leon","Kampungladang","Petite Anse"],"age":30},
    {"first_name":"Tremayne","last_name":"Grason","email":"tgrasono@google.de","gender":"Male","travelled":["Fraga","Mādārīpur","Canoas","Åkersberga","Dzagam"],"age":19},
    {"first_name":"Gerrard","last_name":"Perrottet","email":"gperrottetp@shinystat.com","gender":"Male","travelled":["Dolany","Sesheke","Rybí","Aniva","Além do Rio"],"age":99},
    {"first_name":"Tarrah","last_name":"Musselwhite","email":"tmusselwhiteq@mashable.com","gender":"Female","travelled":["Shchastya","Las Vegas, Santa Barbara","Ñuñoa","La Tinguiña","Montpellier"],"age":36},
    {"first_name":"Leonard","last_name":"O'Logan","email":"lologanr@blogger.com","gender":"Male","travelled":["Zhyrovichy","Duczki","Novorozhdestvenskaya","Corani","Shahrak"],"age":30},
    {"first_name":"Alfie","last_name":"Bulbeck","email":"abulbecks@mediafire.com","gender":"Female","travelled":["Toyota","Jaunpils","Qagan Obo","Leonidovo","San Fernando de Atabapo"],"age":43},
    {"first_name":"Ginny","last_name":"Gossage","email":"ggossaget@cdbaby.com","gender":"Female","travelled":["Colombia","Ponte","Buzhakan","Oliveirinha","Milano"],"age":68},
    {"first_name":"Dill","last_name":"Oades","email":"doadesu@hp.com","gender":"Male","travelled":["Medellin","Amerta","Medellín","Grati Satu","Xiji"],"age":68},
    {"first_name":"Borg","last_name":"Feeley","email":"bfeeleyv@hubpages.com","gender":"Male","travelled":["Pasargunung","Cruzeiro","Shāhīn Dezh","Santo Domingo Este","Longxi"],"age":29},
    {"first_name":"Chrissy","last_name":"Weagener","email":"cweagenerw@dailymotion.com","gender":"Female","travelled":["Kloangpopot","E’erdun Wula","Podbrdo","Srebrenica","Banda Layung"],"age":66},
    {"first_name":"Flemming","last_name":"Branni","email":"fbrannix@creativecommons.org","gender":"Male","travelled":["Agrelo","Kotabaru","Mababanaba","Huadian","Sasa"],"age":57},
    {"first_name":"Ted","last_name":"Beswick","email":"tbeswicky@soundcloud.com","gender":"Male","travelled":["Ouégoa","Barueri","Guiglo","Três Corações","Stockholm"],"age":70},
    {"first_name":"Bess","last_name":"Mathivet","email":"bmathivetz@usa.gov","gender":"Female","travelled":["Guadalupe","Catac","Altagracia de Orituco","Chigang","Laagri"],"age":86},
    {"first_name":"Shelton","last_name":"Milkeham","email":"smilkeham10@storify.com","gender":"Male","travelled":["Västervik","Cruz","Słotowa","Chengkan","Lanas"],"age":58},
    {"first_name":"Christabel","last_name":"Pyson","email":"cpyson11@jugem.jp","gender":"Female","travelled":["Nóvita","Larkird","Baoluan","Yayva","Shahe"],"age":49},
    {"first_name":"Nanny","last_name":"Dibson","email":"ndibson12@cisco.com","gender":"Female","travelled":["Acarí","Verkhovyna","Pulautemiang","Thị Trấn Mường Lát","Lampuyang"],"age":36},
    {"first_name":"Dwight","last_name":"Odger","email":"dodger13@ft.com","gender":"Male","travelled":["Longford","Tegalalang","Boli","Consolación del Sur","Béré"],"age":54},
    {"first_name":"Van","last_name":"Greated","email":"vgreated14@mayoclinic.com","gender":"Bigender","travelled":["Kālīganj","Fradelos","Georgiyevsk","Aksakovo","Baoshan"],"age":43},
    {"first_name":"Jena","last_name":"Quickenden","email":"jquickenden15@booking.com","gender":"Female","travelled":["Butiama","Bến Tre","Jalupang Dua","Villeneuve-d'Ascq","Pitai"],"age":44},
    {"first_name":"Hayes","last_name":"Arkin","email":"harkin16@posterous.com","gender":"Male","travelled":["Il’ka","Ziftá","Łącko","Bayt Ūlā","Hyesan-dong"],"age":51},
    {"first_name":"Kristy","last_name":"Nattriss","email":"knattriss17@msn.com","gender":"Genderqueer","travelled":["Bedinje","Wangjiaping","Sumbuya","Sokal’","Chojnów"],"age":93},
    {"first_name":"Kevyn","last_name":"Pavese","email":"kpavese18@acquirethisname.com","gender":"Female","travelled":["Bandhagen","Cristóbal","Fenchen","Sharan","Litian"],"age":24},
    {"first_name":"Joelynn","last_name":"Proctor","email":"jproctor19@ow.ly","gender":"Female","travelled":["Naberezhnyye Chelny","Pulaukijang","Antipolo","Tajur","Simeykyne"],"age":70},
    {"first_name":"Lauritz","last_name":"Matthensen","email":"lmatthensen1a@accuweather.com","gender":"Male","travelled":["Xiehu","Heshi","Mlangali","Bagjasari","Arari"],"age":88},
    {"first_name":"Carmon","last_name":"Bingle","email":"cbingle1b@ameblo.jp","gender":"Female","travelled":["Kertorejo","Concordia","San Marcos","Quivilla","San Antonio"],"age":33},
    {"first_name":"Mariska","last_name":"Diggons","email":"mdiggons1c@cnet.com","gender":"Female","travelled":["Lamas","Baojia","Santa Magdalena","Bibrka","Malim"],"age":77},
];

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
                assert.deepEqual(travellerFromDB.travelled,traveller.travelled);
                assert.equal(travellerFromDB.age,traveller.age);
            }
            console.log('all '+result.length+' tests passed');
        })
})();



