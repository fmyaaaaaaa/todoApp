import React from "react";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <p>React + Redux によるCountボタン</p>
                <span>Count　：　{this.props.sample}</span>
                <br/>
                <button onClick={() => this.props.handleClick() }>Add</button>
            </div>
        )
    }
}

