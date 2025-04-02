const mysql = require('mysql2');  // Bruk mysql2 for bedre støtte

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Eller din MySQL-bruker
    password: 'VHq*8Xd4q6^SNK:',  // Sett inn ditt MySQL-passord
    database: 'bibliotek'
});

db.connect((err) => {
    if (err) {
        console.error('Feil ved tilkobling til MySQL:', err);
        return;
    }
    console.log('Tilkoblet til MySQL!');
});

module.exports = db;
