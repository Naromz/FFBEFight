import globalReducers from "../reducers/globalReducers";


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

};
export const selectUnit = (UnitData, Position) => ({
    type: GlobalActions.SELECT_UNIT,
    payload: { unitData: UnitData, selected: Position }
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
export const modifyCurTurn = (spot, data) => ({
    type: GlobalActions.MODIFY_TURN_MOVES,
    payload: { spot: spot, data: data }
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
