const fs = require('fs')
const yaml = require('js-yaml')

var parse = `{
		"maxStats":{"hp":4544,"mp":279,"atk":135,"def":144,"mag":220,"spr":208},
			"minStats":{"hp":1500,"mp":92,"atk":45,"def":48,"mag":73,"spr":69},
			"pots":{"hp":540,"mp":90,"atk":40,"def":40,"mag":65,"spr":40}
		}`


async function readYaml() {

	fs.writeFile('./unitsParse.yaml', yaml.safeDump(JSON.parse(parse)), (err) => { console.log(err) });

}

readYaml();