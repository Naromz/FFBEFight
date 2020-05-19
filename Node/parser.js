const fs = require('fs')
const yaml = require('js-yaml')
var http = require('http');
var axios = require('axios');
const cheerio = require('cheerio');


// var parse = `{
// 		"maxStats":{"hp":4544,"mp":279,"atk":135,"def":144,"mag":220,"spr":208},
// 			"minStats":{"hp":1500,"mp":92,"atk":45,"def":48,"mag":73,"spr":69},
// 			"pots":{"hp":540,"mp":90,"atk":40,"def":40,"mag":65,"spr":40}
// 		}`


// async function readYaml() {

// 	fs.writeFile('./unitsParse.yaml', yaml.safeDump(JSON.parse(parse)), (err) => { console.log(err) });

// }

// readYaml();


var download = function (url, dest, cb) {
	var file = fs.createWriteStream(dest);
	var request = http.get(url, function (response) {
		response.pipe(file);
		file.on('finish', function () {
			file.close(cb);  // close() is async, call cb after close completes.
		});
	}).on('error', function (err) { // Handle errors
		fs.unlink(dest); // Delete the file async. (But we don't check the result)
		if (cb) cb(err.message);
	});
};

// download('http://gamepedia.cursecdn.com/exvius_gamepedia_en/9/93/Unit-Tifa_%28FFVII_AC%29-7.png', 'file.png');


// const url = 'https://exvius.gamepedia.com/Unit_List'
// const cheerio = require('cheerio');

// let getData = html => {
// 	data = [];
// 	const $ = cheerio.load(html);
// 	$('tabulator-cell').each((i, elem) => {
// 		data.push({ title: $(elem) });
// 		console.log(data);
// 	})
// }
// axios.get(url).then((res) => {

// 	getData(res.data);

// }).catch(err => {
// 	console.log(err);
// });
async function downloadImage(url, path) {
	console.log(url);
	const writer = fs.createWriteStream(path)

	const response = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	})

	response.data.pipe(writer)

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve)
		writer.on('error', reject)
	})
}




async function loadUnitFile() {

	const data = await fs.readFileSync('./unitsWithSkill.json', 'utf8')
	const unitData = JSON.parse(data);

	const arr = Object.entries(unitData);
	let i = 0;
	let unitDataArr = [];
	for (i = 0; i < arr.length; i++) {

		let curUnitData = Object.entries(arr[i])[1]["1"];
		if (curUnitData.max_rarity == 7) {


			let unitWikiPageData;
			let url;
			await axios.get('https://exvius.gamepedia.com/' + curUnitData.name).then(async (res) => {
				const $ = cheerio.load(res.data);
				if (res.data) {

					url = $(`table.wikitable`).find('img').attr('src');


					if (url) {
						console.log(url);
						await downloadImage(url, `./unitImgFull/${curUnitData.name}Full.png`)
					}

				}
				unitDataArr.push({ name: curUnitData.name, stats: curUnitData.stats, moves: curUnitData.actives, passives: curUnitData.passives, magic: curUnitData.magics, fullImg: `${curUnitData.name}Full` });

			}).catch(err => {

			});

		}

	}

	fs.writeFile('unitsparsed.yaml', yaml.dump({ units: unitDataArr }), (err) => { console.log(err) });
}

async function loadImgFile() {


	let url;
	let i = 0;
	for (i = 126; i < 200; i++) {
		await axios.get(`https://exvius.gamepedia.com/File:Ability_${i}.png`).then(async (res) => {
			const $ = cheerio.load(res.data);
			if (res.data) {

				url = $(`a.internal`).attr('href');
				if (url) {
					console.log(url);
					await downloadImage(url, `./ability/ability_${i}.png`)
				}
			}

		}).catch(err => {

		});
	}


}



loadImgFile();