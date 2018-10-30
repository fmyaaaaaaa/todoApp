import React from 'react';
import { connect } from 'react-redux';

import Todo from './../../pages/todo/Todo';
import { setUserName, getUserId, setUserId, setTodo, setMemo, insertTodoObj, setTodoList, changeIsShowTodo, resetTodoList, changeIsRegister} from "./TodoAction";

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        handleValue: (value) => {
            dispatch(setUserName(value));
        },
        getUserId: (value) => {
            dispatch(getUserId(value));
        },
        handleUserId: (value) => {
            dispatch(setUserId(value));
        },
        handleChangeTodo: (value) => {
            dispatch(setTodo(value));
        },
        handleChangeMemo: (value) => {
            dispatch(setMemo(value));
        },
        insertTodoObj: (value) => {
            dispatch(insertTodoObj(value));
        },
        handleTodoList: (value) => {
            dispatch(setTodoList(value));
        },
        changeIsRegister: (value) => {
            dispatch(changeIsRegister());
        },
        changeIsShowTodoList: (value) => {
            dispatch(changeIsShowTodo());
        },
        resetTodoList: (value) => {
            dispatch(resetTodoList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

