import { call, put, takeLatest } from 'redux-saga/effects'
import { GlobalActions } from '../actions/globalActions';
import Axios from 'axios';


function* bossSaga(action) {
    try {
        const response = yield call(Axios.post, `http://192.168.1.72:3005/getbosses`);

        yield put({
            type: GlobalActions.LOADBOSSES.SUCCESS,
            payload: response.data
        })

    } catch (e) {
        yield put({
            type: GlobalActions.LOADBOSSES.FAIL,
            payload: {
                Err: e.message
            }
        });
    }
}
function* unitSaga(action) {
    try {
        const response = yield call(Axios.post, `http://192.168.1.72:3005/getunits`);

        yield put({
            type: GlobalActions.LOADUNITS.SUCCESS,
            payload: response.data
        })

    } catch (e) {
        yield put({
            type: GlobalActions.LOADUNITS.FAIL,
            payload: {
                Err: e.message
            }
        });
    }
}

function* effectSaga(action) {
    try {
        const response = yield call(Axios.post, `http://localhost:3005/geteffects`);

        yield put({
            type: GlobalActions.LOADEFFECTS.SUCCESS,
            payload: response.data
        })

    } catch (e) {
        yield put({
            type: GlobalActions.LOADEFFECTS.FAIL,
            payload: {
                Err: e.message
            }
        });
    }
}
function* mySaga() {
    // yield takeLatest(AppActionTypes.LOAD_CONFIG_REQUEST, loadConfigFile);
    yield takeLatest(GlobalActions.LOADBOSSES.START, bossSaga);
    yield takeLatest(GlobalActions.LOADUNITS.START, unitSaga);

    yield takeLatest(GlobalActions.LOADEFFECTS.START, effectSaga);
}

export default mySaga;