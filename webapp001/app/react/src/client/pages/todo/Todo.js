import React from 'react';
import ReactDOM from "react-dom";
import ValidateInput from './../../component/input/ValidateInput'
import {Input, Button, Form, Card, Row, Col, Table, Divider} from 'antd';
const {TextArea} = Input;

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
        this.onChange = this.onChange.bind(this);
        this.getUserId = this.getUserId.bind(this);
    }
    
    onChange(event) {
        this.props.handleValue(event.target.value);
    }

    getUserId(){
        if(this.props.userName !== "") {
            this.props.getUserId(this.props.userName);
        }
    }

    render(){
        return (
            <React.Fragment>
                <Form layout="inline">
                    <Form.Item>
                        <Input type="text" onChange={this.onChange} placeholder="What you name..."/>
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
        console.log(this.props);
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
        this.onChangeTodo = this.onChangeTodo.bind(this);
        this.onChangeMemo = this.onChangeMemo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeTodo(event){
        this.props.handleChangeTodo(event.target.value);
    }

    onChangeMemo(event){
        this.props.handleChangeMemo(event.target.value);
    }

    async handleSubmit(event){
        event.preventDefault();
        console.log(this.props);
        const param = {
            userId: this.props.userId,
            todo: this.props.todo,
            memo: this.props.memo
        };
        this.props.insertTodoObj(param);
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <p><label for="todo">todo</label>
                    <Input type="text" onChange={this.onChangeTodo}/>
                </p>
                <p><label for="memo">memo</label>
                    <TextArea type="text" onChange={this.onChangeMemo} autosize/>
                </p>
                <Button type="submit" htmlType="submit">Add</Button>
            </form>
        )
    }
}

/**
 * Todoを追加する。
 */
class AddTodo extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.changeIsRegister(true);
    }

    render(){
        const isRegister = this.props.isRegister;
        return (
            <React.Fragment>
                <br/>
                <p><label>Add Todo？ </label>
                <Button onClick={this.handleClick}>Yes</Button></p>
                {isRegister ? (<Add {...this.props}/>) : (null)}
            </React.Fragment>
        )
    }
}

/**
 * Todoページの骨格。
 */
class Todo extends React.Component {
    render(){
        const isShow = this.props.isShowTodo;
        return(
            <div>
                <Row>
                    <Col span={1}/>
                    <Col span={10}>
                        <br/>
                        <Card title="Todo Management!!">
                            <TodoHeader />
                            <UserNameBar {...this.props} />
                            {isShow ? (<AddTodo {...this.props}/>): null}
                        </Card>
                    </Col>
                    <Col span={1}/>
                    <Col span={10}>
                        <br/>
                        {isShow ? <Card title="Your TodoList..."><RenderTodo {...this.props} /></Card> : null}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Todo;
