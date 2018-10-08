import React from 'react';
import ReactDOM from "react-dom";
import ValidateInput from './../../component/input/ValidateInput'
import {Input, Button, Form, Card, Row, Col, Table, Divider} from 'antd';
const {TextArea} = Input;

const {Provider, Consumer} = React.createContext();

class TodoHeader extends React.Component {
    render(){
        return (
            <React.Fragment>
                <p>Please type your name...</p>
            </React.Fragment>
        )
    }
}

/**
 * UserNameからUserIdを取得する。 　
 */
class UserNameBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: ""
        };
        this.handleValue = this.handleValue.bind(this);
        this.getUserId = this.getUserId.bind(this);
    }

    handleValue(value){
        this.setState({
            userName: value
        });
    }

    getUserId(){
        const url = "http://192.168.33.15:4000";
        fetch(url + "/userList/userId/" + this.state.userName)
            .then(res => res.json()).then(data => {
                this.props.handleToDoList(data);
        }).catch(error => console.log("ERROR!!" + error));
    }

    render(){
        return (
            <React.Fragment>
                <Form layout="inline">
                    <Form.Item>
                        <ValidateInput validateType="TEXT" handleValue={this.handleValue} placeholder="What you name..."/>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.getUserId}>Show</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        )
    }
}

/**
 * TodoListを描画する。
 * UserNameBarで入力したユーザーのTodoListをサーバーから取得して描画。
 */
class RenderTodo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRowKeys: []
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onSelectChange(selectedRowKeys){
        console.log(selectedRowKeys);
        this.setState({selectedRowKeys: selectedRowKeys});
    }

    onClick(){
        const url = "http://192.168.33.15:4000";
        const doneTodo = this.state.selectedRowKeys;
        doneTodo.forEach((todo) => {
            const todoId = this.props.todoList[todo]["id"];
            fetch(url + "/todoList/updateTodo/" + todoId)
                .then(res => res.json()).then(data => {
                    console.log("Update Success");
            }).catch(error => console.log("ERROR!!" + error));
        });
    }

    render() {
        if (this.props.todoList === "") {
            return null;
        }
        const {selectedRowKeys} = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        // ボタンの活性と非活性を制御
        const hasSelected = selectedRowKeys.length > 0;

        // カラム定義
        const columns = [{
            title: 'Content',
            dataIndex: 'todo',
            key: 'todo'
        }, {
            title: 'Memo',
            dataIndex: 'memo',
            key: 'memo'
        }, {
            title: 'State',
            dataIndex: 'isdone',
            key: 'isdone',
            render: (isdone) => (
                isdone ? <span>Done</span> : <span>Yet</span>
            )
        }];

        return (
            <div>
                <Button type="primary" disabled={!hasSelected} onClick={this.onClick}>Done</Button>
                <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Table rowSelection={rowSelection} dataSource={this.props.todoList} columns={columns} position="top"/>
            </div>
        )
    }
}

/**
 * Todoを新規追加
 */
class Add extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todo: "",
            memo: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const url = "http://192.168.33.15:4000";
        const obj = {
            userId: event.target.name,
            todo: this.state.todo,
            memo: this.state.memo
        };
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(url + "/todoList/addTodo", {method, headers, body})
            .then((res) => res.json()).then(data => {
                if(data["error"]){

                }
        }).catch(error => console.log("ERROR!!" + error));
    }

    render(){
        return(
            <Consumer>
                {({state}) => (
                <form onSubmit={this.handleSubmit} name={state.userId}>
                    <p><label for="todo">todo</label>
                        <Input type="text" name="todo" value={this.state.todo} onChange={this.handleChange}/>
                    </p>
                    <p><label for="memo">memo</label>
                        <TextArea type="text" name="memo" value={this.state.memo} onChange={this.handleChange} autosize/>
                    </p>
                    <Button type="submit" htmlType="submit">Add</Button>
                </form>
                )}
            </Consumer>
        )
    }
}

/**
 * Todoを追加する。
 */
class AddTodo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isRegister: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            isRegister: true
        })
    }

    render(){
        const isRegister = this.state.isRegister;
        return (
            <React.Fragment>
                <br/>
                <p><label>Add Todo？ </label>
                <Button onClick={this.handleClick}>Yes</Button></p>
                {isRegister ? (<Add />) : (null)}
            </React.Fragment>
        )
    }
}

/**
 * Todoページの骨格。
 */
class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            todoList: "",
            isShow: false
        };
        this.initialState = this.state;
        this.handleToDoList = this.handleToDoList.bind(this);
    }

    reset() {
        this.setState(this.initialState);
    }

    handleToDoList(data){
        const url = "http://192.168.33.15:4000";
        if(Object.keys(data).length) {
            const userId = data[0]["user_id"];
            fetch(url + "/todoList/todo/" + userId)
                .then(res => res.json()).then(data => {
                this.setState({
                    userId: userId,
                    todoList: data,
                    isShow: true
                });
            }).catch(error => console.log("ERROR!!" + error));
        } else {
            this.reset();
        }
    }

    render(){
        const isShow = this.state.isShow;
        return(
            <div>
                <Row>
                    <Provider value={{state: this.state}}>
                        <Col span={1}/>
                        <Col span={10}>
                            <br/>
                            <Card title="Todo Management!!">
                                <TodoHeader />
                                <UserNameBar handleToDoList={this.handleToDoList}/>
                                {isShow ? (<AddTodo/>): null}
                            </Card>
                        </Col>
                        <Col span={1}/>
                        <Col span={10}>
                            <br/>
                            {isShow ? <Card title="Your TodoList..."><RenderTodo todoList={this.state.todoList} /></Card> : null}
                        </Col>
                    </Provider>
                </Row>
            </div>
        )
    }
}

export default Todo;
