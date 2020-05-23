


function parseString(exportString) {
  var wholeArr = exportString.split("\n")
  wholeArr.forEach(element => {
    var functionArr = ['ATK', 'MAG', 'HP', 'MP', 'DEF', 'SPR']
    var parseArr = [];
    let slot = element.split(":")[0];

    element = element.replace(slot + ": ", '');

    parseArr = element.split(" ");

    let equipItem = '';
    let i = 0;
    let found = false;
    for (i = 0; i < parseArr.length; i++) {
      if (found == false) {
        let arrCnt = 0;
        for (arrCnt = 0; arrCnt < functionArr.length; arrCnt++) {
          if (parseArr[i].includes(functionArr[arrCnt])) {
            found = true;
          }
        }
      }
      if (found == false) {
        equipItem = equipItem + " " + parseArr[i]
      }
    }
    console.log(slot + ":" + equipItem);
  })
};


parseString(`Right hand: Zantetsuken (FFBE) ATK+174, ATK+28% (IW :ATK +15%, ATK +3%, ATK +10%)  
Left hand: Ultima Weapon (FFBE) ATK+180, ATK+29% (IW :ATK +10%, ATK +12%, ATK +7%)  
Head: Scanning Goggles ATK+52  
Body: Storm Bunny Jacket HP+800, ATK+40, DEF+10  
Accessory 1: Upgrade Package ATK+40, ATK+40%, MAG+40  
Accessory 2: Coin of Fate - Sabin HP+30%, ATK+55  
Materia 1: Awesome Swordsman ATK+30%  
Materia 2: Heart's Darkness ATK+70%  
Materia 3: Dual Form   
Materia 4: Dream of the Fayth`);