import { GlobalActions } from '../actions/globalActions'


export default (state = { oldTurnEffects: [], loading: true, loadArray: { units: true, bosses: true }, turnNum: 1, curTurn: [], selUnitData: [], selunitplace: 0, turnData: [] }, action) => {


    switch (action.type) {

        case GlobalActions.SET_CURCOND:
            return {
                ...state,
                curCond: action.payload

            }
        case GlobalActions.ALERT_MESSAGE:
            return {
                ...state
            }

        case GlobalActions.LOADBOSSES.START:
            return {
                ...state,
                loading: true
            }
        case GlobalActions.LOADBOSSES.SUCCESS:
            var loading;
            if (state.loadArray.units === false) {
                loading = false
            }
            return {
                ...state,
                bossData: action.payload,
                loadArray: { ...state.loadArray, bosses: false },
                loading: loading

            }
        case GlobalActions.LOADUNITS.START:
            return {
                ...state,
                unitData: [],
                loading: true

            }


        case GlobalActions.LOADUNITS.SUCCESS:
            var loading = true;
            if (state.loadArray.bosses === false) {
                loading = false
            }
            return {
                ...state,
                unitData: action.payload,
                loadArray: { ...state.loadArray, units: false },
                loading: loading

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

                if (val.uid === state.curMob.uid) {
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


        case GlobalActions.LOAD_EQUIP.SUCCESS:
            {
                var equipData = action.payload.units[0];
                var found = false;
                var curEquip
                if (state.curEquip) {
                    curEquip = state.curEquip.map((val, idx) => {
                        if (val.spot == state.selunitplace) {
                            return { spot: val.spot, data: equipData };
                            found = true;
                        }
                        else {
                            return val;
                        }
                    });
                    if (!found) {
                        curEquip.push({ spot: state.selunitplace, data: equipData })
                    }
                }
                else {
                    curEquip = [{ spot: state.selunitplace, data: equipData }];
                }


                return {
                    ...state,
                    curEquip
                }


            }


        case GlobalActions.MODIFY_TURN_MOVES:
            let curmove = {};

            let curMoves = state.curTurn;
            let curTurn;
            var found = false;
            if (curMoves.length > 0) {
                curTurn = curMoves.map((val, idx) => {
                    curmove = val;
                    if (val.spot === action.payload.spot) {

                        if (val.data[0].name === action.payload.data[0].name) {
                            found = true;
                            curmove = { spot: val.spot, data: [{ name: 'empty', effects: 'none' }] };
                            return curmove;
                        }
                        if (val.data[0].effects[0]?.effect?.multicast) {
                            found = true;
                            curmove = { uid: action.payload.uid, spot: val.spot, data: [...val.data, action.payload.data[0]] };
                            return curmove;
                        }
                        else {
                            found = true;
                            curmove = action.payload;
                            return curmove;
                        }


                    }
                    else {
                        return val;
                    }

                })
                if (!found) {
                    curTurn.push(action.payload);
                }

            }
            else {
                curTurn = [action.payload];
            }


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

        case GlobalActions.ADD_ACTIONS:
            return {
                ...state,
                actions: action.payload
            }
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
        case GlobalActions.SET_CUR_ACTIONS:
            return {
                ...state,
                curActions: action.payload
            }


        case GlobalActions.SEL_UNIT_PLACE:
            return {
                ...state,
                selunitplace: action.payload
            }
        case GlobalActions.NEXT_TURN:
            let Actions = [];
            let i = 0;
            for (i = 0; i < state.curTurn.length; i++) {
                let moveIdx = 0;
                for (moveIdx = 0; moveIdx < state.curTurn[i].data.length; moveIdx++) {
                    let turnEff = state.curTurn[i].data[moveIdx].effects;
                    let effects = [];
                    let effectIdx = 0;
                    for (effectIdx = 0; effectIdx < turnEff.length; effectIdx++) {

                        if (turnEff[effectIdx].effect.cooldownSkill) {
                            let cooldownSkill = turnEff[effectIdx].effect.cooldownSkill.effects;
                            let coolDownIdx = 0;
                            for (coolDownIdx = 0; coolDownIdx < cooldownSkill.length; coolDownIdx++) {
                                if (cooldownSkill[coolDownIdx].effect.turns) {
                                    console.log(cooldownSkill[coolDownIdx]);
                                    if (cooldownSkill[coolDownIdx]?.effect?.area == "ST") {

                                        Actions.push({ ...cooldownSkill[coolDownIdx].effect, mob: state.curMob.uid, spot: state.curTurn[i].spot });
                                    }
                                    else {

                                        Actions.push({ ...cooldownSkill[coolDownIdx].effect, spot: state.curTurn[i].spot });
                                    }
                                }

                            }
                        }

                        if (turnEff[effectIdx].effect.turns) {

                            if (turnEff[effectIdx].effect?.area == "ST") {

                                Actions.push({ ...turnEff[effectIdx].effect, mob: state.curMob.uid, spot: state.curTurn[i].spot });
                            }
                            else {

                                Actions.push({ ...turnEff[effectIdx].effect, spot: state.curTurn[i].spot });
                            }

                        }


                    }
                }


            }

            let lastActions = state.oldTurnEffects;
            lastActions.forEach((val) => {
                if (val.turns > 1) {
                    Actions.push({ ...val, turns: val.turns - 1 })
                }
            });

            return {
                ...state,
                turnNum: state.turnNum + 1,
                turnData: state.turnData.concat([{ turn: state.turnNum + 1, alliesData: state.curTurn, bossData: null }]),
                curTurn: [],
                curActions: [],
                oldTurnEffects: Actions


            }

        case GlobalActions.TESTSAGA.SUCCESS || GlobalActions.TESTSAGA.FAIL:
            return {
                ...state,
                result: action.payload
            }

        case GlobalActions.LOAD_FIXES.SUCCESS || GlobalActions.LOAD_FIXES.FAIL:
            return {
                ...state,
                fixes: action.payload
            }

        case GlobalActions.LOAD_UPDATES.SUCCESS || GlobalActions.LOAD_UPDATES.FAIL:
            return {
                ...state,
                updates: action.payload
            }


        default:
            return state

    }
}