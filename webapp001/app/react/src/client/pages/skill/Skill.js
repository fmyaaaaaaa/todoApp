import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './../../redux/Container';
import Reducer from '../../redux/Reducer';

const store = createStore(Reducer);

export default class Skill extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}
