import React from "react";
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { HashRouter as Router, Link , Route, Switch } from 'react-router-dom';
import {Layout} from 'antd';
import HomePage from './pages/home/Home'
import MainPage from './pages/main/Main'
import TodoPage from './pages/todo/Todo'
import SkillPage from './pages/skill/Skill'
import './../../style/style.scss'

const Loading = () => <div>Loading...</div>;

const TodoApp = () => (
    <Router>
        <div>
            <Layout>
                <Layout.Header>
                    <p className="title">Welcome to TodoApp!!</p>
                </Layout.Header>
                <Layout>
                    <Layout.Sider>
                        <ul>
                            <p className='sub'><Link to='/main'>Main</Link></p>
                            <p className='sub'><Link to='/todo'>TodoList</Link></p>
                            <p className='sub'><Link to='/skill'>Skill</Link></p>
                        </ul>
                    </Layout.Sider>
                    <Layout.Content>
                        <Switch>
                            <Route exact path = "/" component={HomePage}/>
                            <Route path = "/main" component={MainPage}/>
                            <Route path = "/todo" component={TodoPage}/>
                            <Route path = "/skill" component={SkillPage}/>
                        </Switch>
                    </Layout.Content>
                </Layout>
            </Layout>
        </div>
</Router>
);

ReactDOM.render(
    <TodoApp/>, document.getElementById("root")
);
