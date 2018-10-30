import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Todo from './../../redux/todo/TodoContainer';
import TodoReducer from './../../redux/todo/TodoReducer';
import rootSaga from './../../redux/todo/Sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(TodoReducer, applyMiddleware(sagaMiddleware));


export default class TodoPage extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Todo/>
            </Provider>
        )
    }
}

sagaMiddleware.run(rootSaga);
