import globalReducers from "../reducers/globalReducers";
import { v4 as uuidv4 } from 'uuid'

export const GlobalActions = {
    ALERT_MESSAGE: 'ALERT_MESSAGE',
    TESTSAGA: { START: 'TESTSAGASTART', SUCCESS: 'TESTSAGAGOOD', FAIL: 'TESTSAGABAD' },
    LOADBOSSES: { START: 'LOADBOSSESSTART', SUCCESS: 'LOADBOSSESGOOD', FAIL: 'LOADBOSSESFAIL' },
    LOADUNITS: { START: 'LOADBOSSESSTART', SUCCESS: 'LOADUNITSGOOD', FAIL: 'LOADUNITSGOOD' },
    LOADEFFECTS: { START: 'LOADEFFECTSSTART', SUCCESS: 'LOADEFFECTSGOOD', FAIL: 'LOADEFFECTSGOOD' },
    SELECT_UNIT: 'SELECT_UNIT',
    MODIFY_TURN_MOVES: 'MODIFY_TURN_MOVES',
    CHANGE_BOSS: 'CHANGE_BOSS',
    CHANGE_MOB: 'CHANGE_MOB',
    CHANGE_HP: 'CHANGE_HP',
    SEL_UNIT_PLACE: 'SEL_UNIT_PLACE',
    ADD_ACTIONS: 'ADD_ACTIONS',
    SET_CURCOND: 'SET_CURCOND',
    NEXT_TURN: 'NEXT_TURN',
    SET_CUR_ACTIONS: 'SET_CUR_ACTIONS'
};

export const setCurCond = (val) => ({
    type: GlobalActions.SET_CURCOND,
    payload: val
});
export const addActionToState = (val) => ({
    type: GlobalActions.ADD_ACTIONS,
    payload: { data: val }
})
export const selectUnit = (UnitData, Position) => ({
    type: GlobalActions.SELECT_UNIT,
    payload: { unitData: { ...UnitData, uuid: uuidv4() }, selected: Position }
})
export const alertMessage = (val) => ({
    type: GlobalActions.ALERT_MESSAGE,
    payload: val
})
export const changeSelectUnitPlace = (val) => ({
    type: GlobalActions.SEL_UNIT_PLACE,
    payload: val
});
export const loadBosses = () => ({
    type: GlobalActions.LOADBOSSES.START,
    payload: null
})
export const loadUnits = () => ({
    type: GlobalActions.LOADUNITS.START,
    payload: null
})

export const sagaStart = () => ({
    type: GlobalActions.TESTSAGA.START,
    payload: null
})
export const modifyCurTurn = (spot, data, uid) => ({
    type: GlobalActions.MODIFY_TURN_MOVES,
    payload: { uid: uid, spot: spot, data: [data] }
})
export const loadEffectStart = (effectArr) => ({
    type: GlobalActions.LOADEFFECTS.START,
    payload: effectArr
});
export const changeActiveBoss = (bossData) => ({
    type: GlobalActions.CHANGE_BOSS,
    payload: bossData,
});

export const changeActiveMob = (bossData) => ({
    type: GlobalActions.CHANGE_MOB,
    payload: bossData,
});

export const changeHp = (hp) => ({
    type: GlobalActions.CHANGE_HP,
    payload: hp
});

export const nextTurn = () => ({
    type: GlobalActions.NEXT_TURN,
    payload: null
})

export const updateCurActions = (actions) => ({
    type: GlobalActions.SET_CUR_ACTIONS,
    payload: actions
})
