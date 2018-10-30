// UserList
/**
 * userNameの状態管理
 * @returns {{type: string}}
 */
export function setUserName(text) { 
     return { type: 'SET_USER_NAME', text }
}

/**
 * UserIdを取得
 * @param userName
 * @returns {{type: string, payload: {userName: *}}}
 */
export const getUserId = (userName) => ({type: 'GET_USER_ID', payload: {userName: userName} });

/**
 * userIdの状態管理
 * @returns {{type: string}}
 */
export function setUserId(text) {
    return { type: 'SET_USER_ID', text }
}

// TodoList
/**
 * Todoの状態管理
 * @returns {{type: string}}
 */
export function setTodo(todo) {
     return { type: "SET_TODO", todo }
}

/**
 * memoの状態管理
 * @returns {{type: string}}
 */
export function setMemo(memo) {
     return { type: 'SET_MEMO', memo }
}

/**
 * Todoを追加
 * @param param
 * @returns {{type: string, payload: {param: *}}}
 */
export const insertTodoObj = (param) => ({ type: 'ADD_TODO', payload: {param: param}});

/**
 * TodoListの状態管理
 * @returns {{type: string}}
 */
export function setTodoList(list) {
     return { type: 'SET_TODO_LIST', list }
}

/**
 * TodoListの描画を初期化
 * @returns {{type: string}}
 */
export function resetTodoList() {
    return { type: 'RESET_TODO_LIST'}
}


// Boolean

/**
 * Todo入力欄の表示制御
 * @returns {{type: string}}
 */
export function changeIsRegister() {
    return {type: 'CHANGE_IS_REGISTER'};
}

/**
 * TodoListの描画を制御
 * @returns {{type: string}}
 */
export function changeIsShowTodo() {
    return {type: 'CHANGE_IS_SHOW_TODO' }
}