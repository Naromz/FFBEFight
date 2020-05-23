import { delay, call, put, takeLatest } from 'redux-saga/effects'
import { GlobalActions } from '../actions/globalActions';
import { serverAddress } from '../sources'
import Axios from 'axios';


function* bossSaga(action) {
    try {
        console.log(`${serverAddress()}/getbosses`);
        const response = yield call(Axios.post, `${serverAddress()}/getbosses`);

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
        const response = yield call(Axios.post, `${serverAddress()}/getunits`);

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
        const response = yield call(Axios.post, `${serverAddress()}/geteffects`);

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
function* getFixes(action) {
    try {
        const response = yield call(Axios.post, `${serverAddress()}/getFixes`);
        console.log(response.data);
        yield put({
            type: GlobalActions.LOAD_FIXES.SUCCESS,
            payload: response.data
        })

    } catch (e) {
        yield put({
            type: GlobalActions.LOAD_FIXES.FAIL,
            payload: {
                Err: e.message
            }
        });
    }
}
function* getUpdates(action) {
    try {
        const response = yield call(Axios.post, `${serverAddress()}/getUpdates`);
        console.log(response.data);
        yield put({
            type: GlobalActions.LOAD_UPDATES.SUCCESS,
            payload: response.data
        })

    } catch (e) {
        yield put({
            type: GlobalActions.LOAD_UPDATES.FAIL,
            payload: {
                Err: e.message
            }
        });
    }
}

function* writeIssue(action) {
    console.log(action)
    try {
        const response = yield call(() => Axios.post(`${serverAddress()}/writeIssue?name=${action.payload.name}&desc=${action.payload.desc}`))
        yield put({
            type: GlobalActions.WRITEISSUE.SUCCESS,
            payload: response.data
        })

    } catch (e) {
        yield put({
            type: GlobalActions.WRITEISSUE.FAIL,
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
    yield takeLatest(GlobalActions.LOAD_FIXES.START, getFixes);

    yield takeLatest(GlobalActions.WRITEISSUE.START, writeIssue);

    yield takeLatest(GlobalActions.LOAD_UPDATES.START, getUpdates);


}

export default mySaga;