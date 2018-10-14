import React from 'react';
import ReactDOM from "react-dom";
import ValidateInput from './../../component/input/ValidateInput'
import {Input, Button, Form, Card, Row, Col, Table, Divider} from 'antd';
const {TextArea} = Input;

const {Provider, Consumer} = React.createContext();

import {Api} from './../../component/api/Api';

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

    async getUserId(){
        const param = {
            method: "GET",
            param: this.state.userName
        };
        const result = await new Api("getUserId", param).done();
        this.props.handleToDoList(result);
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

    async onClick(){
        const doneTodo = this.state.selectedRowKeys;
        await doneTodo.forEach((todo) => {
            const param = {
                method: "PUT",
                param: this.props.todoList[todo]["id"]
            };
            const result = new Api("updateTodo", param).done();
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

    async handleSubmit(event){
        event.preventDefault();
        const param = {
            method: "POST",
            param: {
                userId: event.target.name,
                todo: this.state.todo,
                memo: this.state.memo
            }
        };
        const result = await new Api("addTodo", param).done();
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

    async handleToDoList(data){
        const url = "http://192.168.33.15:4000";
        if(Object.keys(data).length) {
            const userId = data[0]["user_id"];
            const param = {
                method: "GET",
                param: userId
            };
            const result = await new Api("getTodo", param).done();
                this.setState({
                    userId: userId,
                    todoList: result,
                    isShow: true
                });
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
