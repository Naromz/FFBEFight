const express = require('express')
const app = express()
const port = 3005
const fs = require('fs');
const yaml = require('js-yaml')

const mysql = require('mysql2');
const path = require('path');


var cors = require('cors')



app.use(cors())

// function writeSqlIssue(msg) {

//   return new Promise((resolve, reject) => {
//     connection.query(
//       `INSERT INTO Issues (User,Reddit,Description) VALUES ( ?, ?, ?);`, [msg.name, 1, msg.desc],
//       function (err, results) {
//         if (err) {
//           reject(err);
//         } else {
//           if (results) {
//             resolve('Connected');
//           }

//         }
//       });


//   });
// }

app.post('/writeIssue', async (req, res) => {
  writeSqlIssue(req.query);
  res.send("Wrote");
})

app.post('/getbosses', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync(path.join(__dirname + `/serve/Bosses.yaml`), (err) => { console.log(err) })));
});

app.post('/getFixes', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync(path.join(__dirname + `/serve/Fixes.yaml`), (err) => { console.log(err) })));
});

app.post('/getunits', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync(path.join(__dirname + `/serve/unitsparsed.yaml`), (err) => { nconsole.log(err) })));
});

app.post('/getupdates', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync(path.join(__dirname + `/serve/Updates.yaml`), (err) => { nconsole.log(err) })));
});

app.post('/geteffects', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync(path.join(__dirname + `/serve/Effects.yaml`), (err) => { console.log(err) })));
});

app.get('/images/type/:type/name/:name', async function (req, res) {

  if (req.params.type === 'res') {
    res.sendFile(path.join(__dirname + `/serve/Images/Resistances/${req.params.name}.png`))
  }
  else if (req.params.type === 'boss') {
    res.sendFile(path.join(__dirname + `/serve/Images/Bosses/${req.params.name}.png`))
  }
  else if (req.params.type === 'unit') {
    res.sendFile(path.join(__dirname + `/serve/Images/Units/${req.params.name}`))
  }
  else if (req.params.type === 'move') {
    res.sendFile(path.join(__dirname + `/serve/Images/Items/${req.params.name}`))
  }
  else if (req.params.type === 'item') {
    res.sendFile(path.join(__dirname + `/serve/Images/Items/${req.params.name}`))
  }
  else if (req.params.type === 'misc') {
    res.sendFile(path.join(__dirname + `/serve/Images/Misc/${req.params.name}.png`))
  }
  else {
    res.send("error");
  }
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
