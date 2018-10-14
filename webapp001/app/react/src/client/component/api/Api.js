const ROOT_URL = "http://192.168.33.15:4000";

const API_URL = {
    // UserList
    getUserId: "/userList/userId/",

    // TodoList
    addTodo: "/todoList/addTodo",
    getTodo: "/todoList/todo/",
    updateTodo: "/todoList/updateTodo/"
};

export class Api {
    constructor(apiKey, apiInfo){
        this.rootUrl = ROOT_URL;
        this.apiUrl = API_URL[apiKey];
        this.method = apiInfo.method;
        this.param = apiInfo.param;
    }
    done() {
        return (() => {
            switch (this.method) {
                case "GET":
                    return fetch(this.rootUrl + this.apiUrl + this.param)
                        .then(res => res.json()).then(data => {
                            return data;
                        }).catch(error => console.log("ERROR!!" + error));
                case "POST":
                    const method = "POST";
                    const headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };
                    const body = JSON.stringify(this.param);
                    return fetch(this.rootUrl + this.apiUrl, {method, headers, body})
                        .then((res) => res.json()).then(data => {
                        }).catch(error => console.log("ERROR!!" + error));
                case "PUT":
                    return fetch(this.rootUrl + this.apiUrl + this.param, {method: "PUT"})
                        .then((res) => res.json()).then(data => {
                        }).catch(error => console.log("ERROR!!" + error));
            }
        })();
    }
}
