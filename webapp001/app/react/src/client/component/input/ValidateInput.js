import React from 'react';
import ReactDOM from 'react-dom';
import {Input} from 'antd';

/**
 * 〜How to use〜
 * 親で親自身のstateを変更する関数（`handleValue`）を定義する。
 * 親から呼び出し時に`handleValue`を渡す。
 *
 * Enum値　ValidateType
 * NUMBER　：　半角数値の入力のみ
 * TEXT　　：　半角アルファベットの入力のみ
 */
class ValidateInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: "",
            validateType: this.props.validateType
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // TODO: もっといい方法を検討
    shouldComponentUpdate(nextProps, nextState){
        if(nextState["value"] !== this.state.value){
            return true;
        }
    }

    componentDidUpdate(){
        this.props.handleValue(this.state.value);
    }

    handleChange(newValue) {
        const value = newValue.target.value;
        if(this.state.validateType === "NUMBER"){
            const sample = !isNaN(Number(value));
            if(!isNaN(Number(value))) {
                this.setState({
                    value: value
                })
            }
        }
        if(this.state.validateType === "TEXT") {
            const regex = new RegExp(/^[A-Za-z]*$/);
            if(regex.test(value)){
                this.setState({
                    value: value
                })
            }
        }
    }

    render(){
        return(
            <Input type="text" onChange={this.handleChange}
                   value={this.state.value} placeholder={this.props.placeholder}/>
        )
    }
}

export default ValidateInput;
