import React from 'react';
import ReactDOM from 'react-dom'

class ErrorHandling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }
    componentDidCatch(error, info) {
        this.setState({
            error: error,
            errorInfo: info
        });
        console.log(error, info);
    }

    render(){
        if(this.state.errorInfo){
            return <h1>SomeThing went Wrong!!!</h1>
        }
        return this.props.children;
    }
}

export default ErrorHandling;
