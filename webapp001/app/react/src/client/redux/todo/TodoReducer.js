const initialState = {
    userName: "",
    userId: "",
    todo: "",
    memo: "",
    todoList: "",
    isRegister: false,
    // todoId: "",
    isShowTodo: false,
    
};

export default function todoReducer(state = initialState, action) {
    switch (action.type){
        case 'SET_USER_NAME':
            return Object.assign({}, state, {userName: action.text});
        case 'SET_USER_ID':
            return Object.assign({}, state, {userId: action.userId});
        case 'SET_TODO':
            return Object.assign({}, state, {todo: action.todo});
        case 'SET_MEMO':
            return Object.assign({}, state, {memo: action.memo});
        case 'SET_TODO_LIST':
            return Object.assign({}, state, {todoList: action.todoList});
        case 'RESET_TODO_LIST':
            return Object.assign({}, state, {userId:"", todoList:"", isRegister: false, isShowTodo: false});
        case 'CHANGE_IS_REGISTER':
            const isRegister = state.isRegister;
            return Object.assign({}, state, {isRegister: !isRegister});
        case 'CHANGE_IS_SHOW_TODO':
            return Object.assign({}, state, {isShowTodo: true});
        default:
            return state
    }
}
