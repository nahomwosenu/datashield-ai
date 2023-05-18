import Table from "./EncryptedKnex";

export class QueryBuilder{
    constructor(config) {
        this.ecs = new ECSMID(config.token);
    }
    insert(table:Table){
        let query="insert into "+table.tableName+" (";
        for(let i=0;i<table.columns.length;i++){
            query+=table.columns[i].name;
            if(i!=table.columns.length-1){
                query+=",";
            }
        }
        query+=") values (";
        let valuesToEncrypt=[];

        for(let i=0;i<table.values.length;i++){
            query+="?";
            if(i!=table.values.length-1){
                query+=",";
            }
            if(table.columns[i].type=="encrypted"){
                valuesToEncrypt.push(table.values[i]);
            }
        }
        query+=")";

    }
}