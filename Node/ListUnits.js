
const fs = require('fs')
const yaml = require('js-yaml')
var http = require('http');
var axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const log = console.log;


async function loadUnitFile() {

  const data = await fs.readFileSync('./unitsWithSkill.json', 'utf8')
  const unitData = JSON.parse(data);

  const arr = Object.entries(unitData);
  let i = 0;
  let unitDataArr = [];
  var ascii = /^[A-Za-z0-9 ]*$/;
  for (i = 0; i < arr.length; i++) {

    let curUnitData = Object.entries(arr[i])[1]["1"];
    if (curUnitData.max_rarity == 7) {

      var moves = [];
      curUnitData.actives.forEach(element => {
        if (element.chainFamily === "CWA") {
          if (element.effects[0].effect.damage) {

            if (element.effects[0].effect.damage.mecanism == 'magical') {
              if (ascii.test(element.name)) {
                moves.push({ name: element.name, mod: element.effects[0].effect.damage.coef });

              }
            }
          }


        }
      });



      if (moves.length > 0) {

        log(chalk.blue.bgWhite.bold(curUnitData.name));
        moves.forEach(move => {
          console.log(move.name);
          console.log(move.mod);
        });

      }
      // console.log(curUnitData.actives);
      // unitDataArr.push({
      //   name: curUnitData.name, stats: curUnitData.stats, moves: curUnitData.actives, passives: curUnitData.passives, magic: curUnitData.magics, icon: `unit_icon_${curUnitData.id}.png`, fullImg: `unit_ills_${curUnitData.id}.png`
      // });

    }
  }

  // fs.writeFile('unitsparsed.yaml', yaml.dump({ units: unitDataArr }), (err) => { console.log(err) });
}

loadUnitFile();

// async function loadUnitFile() {

//   const data = await fs.readFileSync('./unitsWithSkill.json', 'utf8')
//   const unitData = JSON.parse(data);

//   const arr = Object.entries(unitData);
//   let i = 0;
//   let unitDataArr = [];
//   for (i = 0; i < arr.length; i++) {

//     let curUnitData = Object.entries(arr[i])[1]["1"];
//     if (curUnitData.max_rarity == 7) {
//       unitDataArr.push({
//         name: curUnitData.name, stats: curUnitData.stats, moves: curUnitData.actives, passives: curUnitData.passives, magic: curUnitData.magics, icon: `unit_icon_${curUnitData.id}.png`, fullImg: `unit_ills_${curUnitData.id}.png`
//       });

//     }
//   }

//   fs.writeFile('unitsparsed.yaml', yaml.dump({ units: unitDataArr }), (err) => { console.log(err) });
// }
