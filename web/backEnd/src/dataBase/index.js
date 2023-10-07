const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0225',
    database: 'site_sesi'
});

db.connect((error) => {
    if (error) {
        console.error(`Erro ao conectar com banco de dados: ${error}`);
        throw error; // Lança o erro para o middleware tratá-lo
    }
    console.log('Conexão realizada com sucesso ao banco de dados');
});


module.exports = db;
    