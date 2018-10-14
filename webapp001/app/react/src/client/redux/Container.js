import React from 'react';
import { connect } from 'react-redux';

import App from './../pages/skill/App';
import { increment } from './Action'

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        handleClick: () => {
            dispatch(increment())
        }
    }
}

// render()で呼び出されるのは、ここでConnectされたComponent
export default connect(mapStateToProps, mapDispatchToProps)(App);
