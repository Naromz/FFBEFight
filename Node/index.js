const express = require('express')
const app = express()
const port = 3005
const fs = require('fs');
const yaml = require('js-yaml')

var cors = require('cors')



app.use(cors())


app.post('/getbosses', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync("./Bosses.yaml", (err) => { console.log(err) })));
});

app.post('/getunits', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync("./Units.yaml", (err) => { console.log(err) })));
});

app.post('/geteffects', async (req, res) => {
  res.send(await yaml.load(fs.readFileSync("./Effects.yaml", (err) => { console.log(err) })));
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))