import React from 'react';
import ReactDOM from "react-dom";

import ValidateInput from './../../component/input/ValidateInput'

class LifeCycle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(data){
        const number = Number(data);
        this.setState({
            data: number
        })
    }
}

function withSubscription(WrappedLifeCycle, selectData) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData
            }
        }

        handleChange(data) {
            const number = Number(data);
            this.setState({
                data: number
            })
        }
    }
}


class Skill extends React.Component {
    render(){
        return(
            <div>
                <label>SkillPage</label>
                <form>
                    <ValidateInput validateType="TEXT"/>
                </form>
            </div>
        )
    }
}

export default Skill;
