const fs = require('fs')
const yaml = require('js-yaml')

var parse = `[
			{"id":"230081","name":"Regina Cannon","icon":"ability_10.png","effects":[{"effect":{"damage":{"mecanism":"physical","damageType":"body","coef":1,"ignore":{"def":50}},"area":"ST","target":"ENEMY"},"desc":"Physical damage (1x * 2 = 2x, ATK) to one enemy (ignore cover)"},{"effect":{"statsBuff":{"lbDamage":120},"turns":2,"area":"SELF","target":"SELF"},"desc":"Increase LB damage by 120% for 2 turns"}],"frames":[40],"move":"walk","type":"ability","mpCost":28,"rarity":5,"level":1},
			{"id":"230082","name":"Speed Mode","icon":"ability_96.png","effects":[{"effect":{"noUse":true,"mirage":3,"turns":2,"area":"SELF","target":"SELF"},"desc":"Dodge 3 physical attacks for 2 turns to caster"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":2},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 200% for one turn"}],"type":"ability","mpCost":42,"rarity":5,"level":20},
			{"id":"230092","name":"Master Order","icon":"ability_96.png","effects":[{"effect":null,"desc":"Fixed damage (3000) to the rest of the party"},{"effect":{"noUse":true,"globalMitigation":50,"turns":1,"area":"SELF","target":"SELF"},"desc":"Reduce damage taken by 50% to caster for one turn"},{"effect":null,"desc":"Restore 100% HP and MP to caster"},{"effect":{"lbFill":{"min":100,"max":100},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 100 to caster"}],"type":"ability","rarity":5,"level":55},
			{"id":"230083","name":"Offense Mode","icon":"ability_96.png","effects":[{"effect":{"statsBuff":{"atk":150,"mag":150},"turns":2,"area":"SELF","target":"SELF"},"desc":"Increase ATK and MAG by 150% for 2 turns to caster"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":2},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 200% for one turn"}],"type":"ability","mpCost":42,"rarity":6,"level":40},
			{"id":"230084","name":"Defense Mode","icon":"ability_96.png","effects":[{"effect":{"statsBuff":{"def":150,"spr":150},"turns":2,"area":"SELF","target":"SELF"},"desc":"Increase DEF and SPR by 150% for 2 turns to caster"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":2},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 200% for one turn"}],"type":"ability","mpCost":42,"rarity":6,"level":60},
			{"id":"230085","name":"Barrier Mode","icon":"ability_96.png","effects":[{"effect":{"noUse":true,"area":"SELF","target":"SELF"},"desc":"Grant a 2000 HP shield to caster for 2 turns"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":2},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 200% for one turn"}],"type":"ability","mpCost":42,"rarity":6,"level":80},
			{"id":"509360","name":"Penta-Tactics","icon":"ability_8.png","effects":[{"effect":{"multicast":{"time":5,"type":"skills","skills":[{"id":"230081","name":"Regina Cannon"},{"id":"230082","name":"Speed Mode"},{"id":"230083","name":"Offense Mode"},{"id":"230084","name":"Defense Mode"},{"id":"230085","name":"Barrier Mode"},{"id":"230086","name":"Anti-Fairy Module"},{"id":"230087","name":"Anti-Demon Module"},{"id":"230088","name":"Anti-Machine Module"},{"id":"230089","name":"Reboot Command"},{"id":"230090","name":"Power Generator"},{"id":"230091","name":"Cana's System"}]}},"desc":"Gain 5 uses of Anti-Demon Module (230087), Anti-Fairy Module (230086), Anti-Machine Module (230088), Barrier Mode (230085), Cana's System (230091), Defense Mode (230084), Offense Mode (230083), Power Generator (230090), Reboot Command (230089), Regina Cannon (230081) and Speed Mode (230082) for one turn"}],"type":"ability"},
			{"id":"230086","name":"Anti-Fairy Module","icon":"ability_96.png","effects":[{"effect":{"killers":[{"name":"spirit","physical":150}],"turns":2,"area":"SELF","target":"SELF"},"desc":"Increase physical damage against Fairies by 150% to caster for 2 turns"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":5},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 500% for one turn"}],"type":"ability","mpCost":58,"rarity":7,"level":105},
			{"id":"230087","name":"Anti-Demon Module","icon":"ability_96.png","effects":[{"effect":{"killers":[{"name":"demon","physical":150}],"turns":2,"area":"SELF","target":"SELF"},"desc":"Increase physical damage against Demons by 150% to caster for 2 turns"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":5},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 500% for one turn"}],"type":"ability","mpCost":58,"rarity":7,"level":105},
			{"id":"230088","name":"Anti-Machine Module","icon":"ability_96.png","effects":[{"effect":{"killers":[{"name":"machine","physical":150}],"turns":2,"area":"SELF","target":"SELF"},"desc":"Increase physical damage against Machinas by 150% to caster for 2 turns"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":5},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 500% for one turn"}],"type":"ability","mpCost":58,"rarity":7,"level":105},
			{"id":"230089","name":"Reboot Command","icon":"ability_96.png","effects":[{"effect":{"noUse":true,"area":"SELF","target":"SELF"},"desc":"Remove ATK, DEF, MAG and SPR debuff from caster"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":8},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 800% for one turn"}],"type":"ability","mpCost":58,"rarity":7,"level":110},
			{"id":"230090","name":"Power Generator","icon":"ability_105.png","effects":[{"effect":{"cooldownSkill":{"id":"509361","name":"Power Generator","icon":"ability_105.png","effects":[{"effect":{"statsBuff":{"atk":250,"def":250,"mag":250,"spr":250},"turns":2,"area":"SELF","target":"SELF"},"desc":"Increase ATK, DEF, MAG and SPR by 250% for 2 turns to caster"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":10},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 1000% for one turn"}],"type":"ability","mpCost":84},"cooldownTurns":4,"startTurn":1,"area":"SELF","target":"SELF"},"desc":"Unlock Power Generator (509361) on turn 1 [4 turns CD]"}],"type":"ability","mpCost":84,"rarity":7,"level":110},
			{"id":"230091","name":"Cana's System","icon":"ability_105.png","effects":[{"effect":{"cooldownSkill":{"id":"509362","name":"Cana's System","icon":"ability_105.png","effects":[{"effect":{"noUse":true,"area":"SELF","target":"SELF"},"desc":"Auto-revive (100% HP) for 2 turns to caster"},{"effect":{"lbFill":{"min":25,"max":25},"area":"SELF","target":"SELF"},"desc":"Increase LB gauge by 25 to caster"},{"effect":{"skillEnhancement":{"230081":10},"turn":1},"desc":"Increase damage of Regina Cannon (230081) by 1000% for one turn"}],"type":"ability","mpCost":84},"cooldownTurns":4,"startTurn":1,"area":"SELF","target":"SELF"},"desc":"Unlock Cana's System (509362) on turn 1 [4 turns CD]"}],"type":"ability","mpCost":84,"rarity":7,"level":110}
		]`


async function readYaml() {

	fs.writeFile('./unitsParse.yaml', yaml.safeDump(JSON.parse(parse)), (err) => { console.log(err) });

}

readYaml();