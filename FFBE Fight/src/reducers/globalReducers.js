import { GlobalActions } from '../actions/globalActions'


export default (state = { curTurnData: { moves: [], effects: [] }, loading: true, turnNum: 0, curTurn: [], selUnitData: [], selunitplace: 0 }, action) => {


    switch (action.type) {
        case GlobalActions.ALERT_MESSAGE:
            alert(action.payload);
            return {
                ...state
            }

        case GlobalActions.LOADBOSSES.START:
            return {
                ...state,
                loading: true
            }
        case GlobalActions.LOADBOSSES.SUCCESS:

            return {
                ...state,
                bossData: action.payload,
                loading: false

            }
        case GlobalActions.LOADUNITS.START:
            return {
                ...state,
                unitData: [],
                loading: true

            }


        case GlobalActions.LOADUNITS.SUCCESS:
            return {
                ...state,
                unitData: action.payload,
                loading: false

            }

        case GlobalActions.LOADEFFECTS.SUCCESS:
            return {
                ...state,
                effectData: action.payload,
                loading: false
            }
        case GlobalActions.CHANGE_MOB:

            let selMobSelect = {};

            for (let i = 0; i < state.curWaveData.mobs.length; i++) {

                if (state.curWaveData.mobs[i].uid === action.payload) {
                    selMobSelect = state.curWaveData.mobs[i];
                }
            }
            return {
                ...state,
                curMob: selMobSelect,

            }
        case GlobalActions.CHANGE_HP:
            let newWave = state.curWaveData.mobs.map((val) => {

                if (val.uid == state.curMob.uid) {
                    val.hp = action.payload;

                }
                return val;

            });
            return {
                ...state,
                curWaveData: { ...state.curWaveData, mobs: newWave }

            }

        case GlobalActions.CHANGE_BOSS:
            let selBossData = {};

            for (let i = 0; i < state.bossData.length; i++) {
                if (state.bossData[i].uid === action.payload) {
                    selBossData = state.bossData[i];
                }
            }
            return {
                ...state,
                selBossUid: action.payload,
                curBossData: selBossData,
                curWaveData: selBossData.waves[0],
                curMob: selBossData.waves[0].mobs[0],
                curWave: 0,
                curTurn: 0,
                selunitplace: 0,

            }



        case GlobalActions.MODIFY_TURN_MOVES:
            let curTurn = {};



            return {
                ...state,
                curTurn: curTurn,
            }
        // var found = false;
        // var selected = action.payload.selected;
        // var curTurn = [];

        // if (state.curTurn.moves) {
        //     curTurn.moves = state.curTurn.moves.map(element => {
        //         if (element.spot === action.payload.spot) {
        //             found = true;
        //             return action.payload;
        //         }
        //         return element;
        //     });
        //     if (!found) {
        //         curTurn.moves.push(action.payload);
        //     }

        // }
        // else
        // {
        //     curTurn = [{ moves: [action.payload] }, ]
        // }



        // return {
        //     ...state,
        //     curTurn: { moves: [...state.curTurn.moves], effects: [...state.curTurn.effects] }
        // };


        case GlobalActions.SELECT_UNIT:


            var found = false;
            var selected = action.payload.selected;

            const selUnitData = state.selUnitData.map(element => {
                if (element.selected === selected) {
                    found = true;
                    return action.payload;
                }
                return element;
            });


            if (!found) {
                selUnitData.push(action.payload);
            }

            return {
                ...state,
                selUnitData,
                selunitplace: 0,
            };


        case GlobalActions.SEL_UNIT_PLACE:
            return {
                ...state,
                selunitplace: action.payload
            }

        case GlobalActions.TESTSAGA.SUCCESS || GlobalActions.TESTSAGA.FAIL:
            return {
                ...state,
                result: action.payload
            }

        default:
            return state

    }
}