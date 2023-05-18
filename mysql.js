module.exports = class MySQLHelper {
    constructor(config) {
        this.config = config;
        const ECSMID = require('./ECSMID');
        this.ecs = new ECSMID(config.token);
        this.initial();
    }

    initial() {
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection({
            host: this.config.database_config.host,
            user: this.config.database_config.username,
            password: this.config.database_config.password,
            database: this.config.database_config.database
        });
        this.connection.connect((err) => {
            if (err) {
                console.log(err);
                throw new Error("failed to connect to mysql");
            } else {
                console.log("connected to mysql");
            }
        });
        if (this.connection) {
            console.log("connected to mysql");
        } else {
            console.log("failed to connect to mysql");
            throw new Error("failed to connect to mysql");
        }
    }

    encryptedInsert(table, columns, values) {
        let query = "insert into " + table + " (";
        for (let i = 0; i < columns.length; i++) {
            query += columns[i];
            if (i != columns.length - 1) {
                query += ",";
            }
        }
        query += ") values (";

        for (let i = 0; i < values.length; i++) {
            query += "?";
            if (i != values.length - 1) {
                query += ",";
            }
        }
        query+=")";

        this.ecs.encryptArray(values).then((data) => {
            let d = data.data;
            if(d.length!=values.length){
                throw new Error("failed to encrypt");
            }

            console.log("final query: ", query);
            console.log("final data: ", d);
            this.connection.query(query,d, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rows);
                }
            });
        })
            .catch((err) => {
                console.log(err);
            });


    }

    decryptedSelect(table, columns, where) {
        let query = "select ";
        for (let i = 0; i < columns.length; i++) {
            query += columns[i];
            if (i != columns.length - 1) {
                query += ",";
            }
        }
        query += " from " + table + " where " + where;
        this.connection.query(query, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                
            }
        });
    }
}
