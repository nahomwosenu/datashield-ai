var CONFIG={
    database_type:'mysql',
    API_TOKEN:'1234567890',
    database_config:{
        host:'localhost',
        username: 'root',
        password: '',
        database: 'mock5'
    }
};
function init(config) {
  CONFIG=config||{};
}