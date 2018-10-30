const ROOT_URL = "http://192.168.33.15:4000";
const API_URL = {
    // UserList
    getUerId: "/userList/userId/",

    // TodoList
    addTodo: "/todoList/addTodo",
    getTodo: "/todoList/todo/",
    updateTodo: "/todoList/updateTodo/"
};

export function getUserId(userName) {
    return fetch(ROOT_URL + API_URL.getUerId + userName)
        .then(res => res.json()).then(data => {
            return data;
        }).catch(error => console.log("ERROR!!" + error));
}

export function getTodoList(userId) {
    return fetch(ROOT_URL + API_URL.getTodo + userId)
        .then(res => res.json()).then(data => {
            return data;
        }).catch(error => console.log("ERROR!!" + error));
}

export function insertTodoObj(param) {
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify(param);
    return fetch(ROOT_URL + API_URL.addTodo, {method, headers, body})
        .then((res) => res.json()).then(data => {
        }).catch(error => console.log("ERROR!!" + error));
}
