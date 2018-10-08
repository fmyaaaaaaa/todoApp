import React from 'react';
import ReactDOM from "react-dom";
import ErrorHandling from '../../component/error/ErrorHandling'

class ErrorButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
        this.makeError = this.makeError.bind(this);
    }

    makeError(){
        this.setState({
            hasError: true
        });
    }
    render (){
        if(this.state.hasError){
            throw new Error("Wow!!!");
        }
        return (
            <div>
                <button onClick={this.makeError}>Error!!</button>
            </div>
        )
    }
}

class Main extends React.Component {
    render(){
        return(
            <ErrorHandling>
                <ErrorButton/>
            </ErrorHandling>
        )
    }
}

export default Main;
