const express = require('express')
const app = express()
const port = 3005
const fs = require('fs');
const yaml = require('js-yaml')

const mysql = require('mysql2');


var cors = require('cors')


const connection = mysql.createConnection({
  host: '104.248.49.169',
  user: 'Zachary',
  password: 'MickSucks1994',
  database: 'FfbeFight',
  connectTimeout: 30000
});


app.use(cors())

function writeSqlIssue(msg) {

  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Issues (User,Reddit,Description) VALUES ( ?, ?, ?);`, [msg.name, 1, msg.desc],
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          if (results) {
            resolve('Connected');
          }

        }
      });


  });
}

app.post('/writeIssue', async (req, res) => {
  writeSqlIssue(req.query);
  res.send("Wrote");
})

app.post('/getbosses', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync("./Bosses.yaml", (err) => { console.log(err) })));
});

app.post('/getFixes', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync("./Fixes.yaml", (err) => { console.log(err) })));
});

app.post('/getunits', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync("./unitsparsed.yaml", (err) => { nconsole.log(err) })));
});

app.post('/geteffects', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync("./Effects.yaml", (err) => { console.log(err) })));
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))