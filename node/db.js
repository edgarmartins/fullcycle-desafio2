const mysql = require('mysql');
const { config } = require('./config');

async function exec(sql) {
  const conexao = mysql.createConnection(config);

  const queryPromise = new Promise((resolve, reject) => {
    conexao.query(sql, function (error, results) {
      if (error) reject(error);

      resolve(results)
    })
  })

  const queryResults = await queryPromise;

  conexao.end();
  return queryResults;
}

const DB = {
  exec
}

module.exports = { DB }