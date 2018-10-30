import { call, put, fork, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { getUserId, getTodoList, insertTodoObj } from './../../component/api/Api';

function* fetchUserId(action) {
    try {
        const result = yield call(getUserId, action.payload.userName);
        if (result) {
            const userId = result[0]["user_id"];
            yield put({type: "SET_USER_ID", userId});
            const todoList = yield call(getTodoList, userId);
            yield put({type: "SET_TODO_LIST", todoList});
            yield put({type: "CHANGE_IS_SHOW_TODO"});
        }
    } catch (e) {
        yield put({type: "RESET_TODO_LIST"});
        console.log("Reset!!");
    }
}

function* insertTodo(action) {
    try{
        const param = action.payload.param;
        const result = yield call(insertTodoObj, param);
    } catch (e) {
        console.log("Error!!");
    }
}

export default function* rootSaga() {
    yield takeEvery("GET_USER_ID", fetchUserId);
    yield takeEvery("ADD_TODO", insertTodo)
}
