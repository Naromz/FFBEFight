import store from '../store'
import { loadBosses, changeActiveBoss } from '../actions/globalActions'


export default function LoadStuff() {
  store.dispatch(loadBosses());
}

export function checkCondition(uid) {
  let curState = store.getState();
  let curMob = curState.globalReducer.curMob;
  let curConditions = curMob.cond;
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
      }
    }
  }

  return conditionTrue;
};

export function parseActions() {

};
