module.exports = class ECSMID {
    constructor(token) {
        this.token = token;
        this.endpoint = "http://localhost:8000";
        this.https=require('https');
        this.http=require('http');
    }
    encryptGeneric = (data) => {
        return this.apiCall(this.endpoint + "/v1/encrypt/generic", { "text": data });
    }
    encryptArray = (data) => {
        return this.apiCall(this.endpoint + "/v1/encrypt/array", { "array": data });
    }
    decryptArray = (data) => {
        return this.apiCall(this.endpoint + "/v1/decrypt/array", { "array": data });
    }
    decryptGeneric = (data) => {
        return this.apiCall(this.endpoint + "/v1/decrypt/generic", { "cipher_text": data });
    }
    apiCall(url,jsonData){
        let promise = new Promise((resolve, reject) => {
            // create an options object for the request
            console.log("token: ",this.token);
            let options = {
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            };
            // create a request object
            let req = this.http.request(url, options, (res) => {
                // initialize an empty response body
                let body = '';
                // listen for data chunks
                res.on('data', (chunk) => {
                    // append the chunk to the body
                    body += chunk;
                });
                // listen for end of response
                res.on('end', () => {
                    // parse the body as JSON
                    console.log("response: ",body);
                    let data = JSON.parse(body);
                    // resolve the promise with the data
                    console.log("data: ",data);
                    resolve(data);
                });
            });
            // listen for errors
            req.on('error', (err) => {
                // reject the promise with the error
                reject(err);
            });
            // write the payload as a string to the request
            req.write(JSON.stringify(jsonData));
            // end the request
            req.end();
        });
        // return the promise object
        return promise;
    }
}