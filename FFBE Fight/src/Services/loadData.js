import store from '../store'
import { loadBosses, changeActiveBoss, updateCurActions } from '../actions/globalActions'
// import Conditions from '../components/Conditions';
import { v4 as uuidv4 } from 'uuid'


export default function LoadStuff() {
  store.dispatch(loadBosses());
}

export function UpdateActions() {
  store.dispatch(updateCurActions(parseMoves()));
}

function findUnitbyUID(UID) {

  let state = { ...store.getState() };
  let units = state.globalReducer.selUnitData;
  let found = false;
  let unit;
  for (let i = 0; i < units.length; i++) {
    if (units[i].unitData.uuid == UID) {
      unit = units[i];
    }

  }
  return unit;
}
function parseMove(move) {
  let state = { ...store.getState() };
  let curMobData = state.globalReducer.curMob;

  if (move?.data) {
    let newArr = [];

    for (let i = 0; i < move.data.length; i++) {
      if (Array.isArray(move.data[i].effects)) {


        move.data[i].effects.forEach(element => {

          let action = {};

          if (element.effect?.multicast) {

            newArr.push({
              note: 'Activate Multicast Skills', key: uuidv4(), tar: 'NA', caster: findUnitbyUID(move.uid).unitData?.name, eff: 'Multicast', type: 'Multicast'
            })

          }

          if (element.effect?.imperil) {
            let imperillvl;


            let imperil = 0;

            for (imperil = 0; imperil < Object.entries(element.effect?.imperil).length; imperil++) {
              let [key, val] = Object.entries(element.effect?.imperil)[imperil];
              newArr.push({
                note: key + " " + val, key: uuidv4(), strength: val, tar: 'ENEMY', caster: findUnitbyUID(move.uid).unitData?.name, eff: 'Imperil', type: 'Imperil', turns: element.effect?.turns
              })
            }


          }

          //Handle Damage Effects
          if (element.effect?.damage) {
            if (element.effect?.area == "ST") {
              if (element?.effect?.damage?.elements) {
                newArr.push({ note: (element?.effect?.damage?.mecanism), key: uuidv4(), strength: element?.effect?.damage?.coef, type: 'Damage', caster: findUnitbyUID(move.uid).unitData?.name, eff: 'ST Damage Elemental ' + element?.effect?.damage?.elements[0].charAt(0).toUpperCase() + element?.effect?.damage?.elements[0].slice(1), tar: curMobData?.name })
              }
              else {
                newArr.push({ note: (element?.effect?.damage?.mecanism), key: uuidv4(), strength: element?.effect?.damage?.coef, type: 'Damage', caster: findUnitbyUID(move.uid).unitData?.name, eff: 'ST Damage Non-Elemental', tar: curMobData?.name })
              }

            }
            if (element.effect?.area == "AOE") {
              if (element?.effect?.damage?.elements) {
                newArr.push({ note: (element?.effect?.damage?.mecanism), key: uuidv4(), strength: element?.effect?.damage?.coef, type: 'Damage', caster: findUnitbyUID(move?.uid).unitData?.name, eff: 'AOE Damage Elemental ' + element?.effect?.damage?.elements[0].charAt(0).toUpperCase() + element?.effect?.damage?.elements[0].slice(1), tar: 'aoe' })
              }
              else {
                newArr.push({ note: (element?.effect?.damage?.mecanism), key: uuidv4(), strength: element?.effect?.damage?.coef, type: 'Damage', caster: findUnitbyUID(move?.uid).unitData?.name, eff: 'AOE Damage Non-Elemental', tar: 'aoe' })
              }

            }
          }

          //Handle Resist Effects
          if (element.effect?.resist) {
            if (element.effect?.area == "AOE") {
              newArr.push({ note: (element?.effect?.resist[0].percent), key: uuidv4(), strength: element?.effect?.resist[0].percent, caster: findUnitbyUID(move.uid).unitData?.name, type: 'Resistance Buff', eff: 'AOE Resistance ' + element?.effect?.resist[0].name.charAt(0).toUpperCase() + element?.effect?.resist[0].name.slice(1), tar: 'Allies', turns: element?.effect?.turns })
            }
            else {
              //newArr.push({ caster: findUnitbyUID(move.uid, props.selUnits).unitData?.name, eff: 'ST Damage Non-Elemental', tar: props.curMobData?.name })
            }

          }

        });
      }
    }

    return newArr;
  }

}




export function checkCondition(uid, mobid) {

  let curState = store.getState();
  let curWave = curState.globalReducer.curWaveData;
  let curMobData;
  let curActions = curState.globalReducer.curActions;
  let targeted = false;


  if (mobid) {
    let mobIdx = 0;

    for (mobIdx = 0; mobIdx < curWave.mobs.length; mobIdx++) {

      if (curWave.mobs[mobIdx].uid == mobid) {

        targeted = true;
        curMobData = curWave.mobs[mobIdx];
      }
    }


  }

  if (targeted == false) {
    curMobData = curState.globalReducer.curMob;
  }

  let curConditions = curMobData.cond;
  let turn = curState.globalReducer.turnNum;
  let conditionTrue = false;
  let i = 0;
  for (i = 0; i < curConditions.length; i++) {
    if (curConditions[i].uid == uid) {
      if (curConditions[i].trigger.type == 'turn') {
        if (curConditions[i].trigger.repeatstring) {
          let multiplier = curConditions[i].trigger.repeatstring.split("n")[0];
          let modifier = curConditions[i].trigger.repeatstring.split("n")[1];
          let testNum = 0;
          for (testNum = 0; testNum < 40; testNum++) {
            if (testNum * multiplier + Number(modifier) == turn) {
              conditionTrue = true;
            }
          }
        }

        if (curConditions[i].trigger.repeat) {
          if (turn % curConditions[i].trigger.repeat == 0) {
            conditionTrue = true;
          }
        }
      }
      if (curConditions[i].trigger.type == 'magdmg') {
        let found = false;
        let actionIdx = 0;
        if (curActions) {
          for (actionIdx = 0; actionIdx < curActions.length; actionIdx++) {
            if ((curActions[actionIdx].note == "magical" && curActions[actionIdx].tar == 'aoe') || (curActions[actionIdx].note == "magical" && curActions[actionIdx].tar == curMobData.name)) {
              conditionTrue = true;
            }
          }
        }
      }
      if (curConditions[i].trigger.type == 'physdmg') {
        let found = false;
        let actionIdx = 0;
        if (curActions) {
          for (actionIdx = 0; actionIdx < curActions.length; actionIdx++) {
            if ((curActions[actionIdx].note == "physical" && curActions[actionIdx].tar == 'aoe') || (curActions[actionIdx].note == "physical" && curActions[actionIdx].tar == curMobData.name)) {
              conditionTrue = true;
            }
          }
        }
      }

    }
  }

  return conditionTrue;
};

export function CalcPhysicalDamage(UnitAtk, EnemyDef, Level, Modifier, EnemyBreak, EnemyBuff, Multipliers, DefIgnore, WeaponVariance) {

  var EnemyMod;
  EnemyMod = (EnemyDef * (100 - (EnemyBreak - EnemyBuff) / 100) * ((100 - DefIgnore) / 100))
  var TotalDamage;
  var LevelCorrection = (1 + (Level / 100));
  TotalDamage = (UnitAtk * UnitAtk) / EnemyMod;
  TotalDamage = TotalDamage * LevelCorrection;
  TotalDamage = TotalDamage * Multipliers;
  TotalDamage = TotalDamage * .925;
  TotalDamage = TotalDamage * 1.25;
  TotalDamage = TotalDamage * Modifier;
  TotalDamage = TotalDamage * 100;


  return TotalDamage;




}



function findMove(moveid, mobid) {
  let curState = { ...store.getState() };
  let curWave = curState.globalReducer.curWaveData;

  let mobIdx = 0;
  let mob;
  let found = false;
  for (mobIdx = 0; mobIdx < curWave.mobs.length; mobIdx++) {
    // curWave.mobs[mobIdx].uid = mobid;

    if (mobid == curWave.mobs[mobIdx].uid) {
      mob = curWave.mobs[mobIdx];
      found = true;
    }
  }
  if (found == false) {
    mob = curState.curMob;
  }


  if (mob) {
    let data = mob.moves;
    let i = 0;

    for (i = 0; i < data.length; i++) {
      if (data[i].uid == moveid) {
        return data[i];
      }
    }

  }

  else return null;

}

function returnUnitStats() {

}

export function parseMoves() {
  let state = { ...store.getState() };
  let curTurn = state.globalReducer.curTurn;


  var arr = [];
  let i = 0;

  for (i = 0; i < curTurn.length; i++) {

    arr = arr.concat(parseMove(curTurn[i]));
  }

  return (arr);


};

export function parseConditions() {

  let state = { ...store.getState() };
  let curWave = state.globalReducer.curWaveData;
  let mobs = curWave.mobs;

  let i = 0;
  let conditionList = [];

  for (i = 0; i < mobs.length; i++) {



    let cond = 0;
    for (cond = 0; cond < mobs[i].cond.length; cond++) {
      let condition = {};

      condition.uid = mobs[i].cond[cond].uid;
      condition.trigger = JSON.stringify(mobs[i].cond[cond].trigger);
      condition.moves = findMove(mobs[i].cond[cond].moves[0].uid, mobs[i].uid).name;
      condition.name = mobs[i].name;
      condition.desc = mobs[i].desc;

      conditionList.push(condition);
    }

  }




  return conditionList;

}
