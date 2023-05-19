const ECSMID = require('./ECSMID');
const assert = require("assert");

const ecsmid=new ECSMID('MRgJDi4FYTAlFScDNQJEeRc/dQcrXxYwOzYKPCcrJFQ5NglwDVFqAjUSQzwjMTIA.Gx4OAD5/dg46bzpBOn4fCRQnaQcrQXJEF2goOjwbJhYUJBYBNVFyQzoqWz0iOyAMNRgNfABYaTEqFSMwOn8uBRscIAcpCnY/GBUjEjUCB2gCbQkgOH92JTpsORMaKzhWAgN1AC9Rchs6Kl0vOjkzeQQ5FgE2QWoYOioeOjsrOGwbHgIANHdPMCMVJwA1BDlx.XMS8xKbDq1vCry3DhMSPw4NcxIpBxLTDrcK1wqRE');

const encrypted=ecsmid.encryptString('Hello World');
console.log("Encrypted",encrypted);
const decrypted=ecsmid.decryptString(encrypted);
assert.equal('Hello World',decrypted);
/*(async()=>{


    const data=['Bob','Alice','Dan'];
    const encryptedArr=await ecsmid.encryptArrayData(data);
    const decryptedArr=await ecsmid.decryptArrayData(encryptedArr);
    console.log("encryptedArr",encryptedArr);
    console.log("decryptedArr",decryptedArr);
    assert.deepEqual(data,decryptedArr);
})();*/
