import React, { Component } from "react";

// Input: id,text, checkbox_click, item_detail_style
class Item extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <li className="todo-app__item">
                <div className="todo-app__checkbox" onChange={() => this.props.checkbox_click(this.props.id)}>
                    <input id={this.props.id} type='checkbox' defaultChecked={this.props.checkbox_checked(this.props.id)}></input>
                    <label htmlFor={this.props.id}></label>
                </div>
                <h1 className="todo-app__item-detail" style={this.props.item_detail_style(this.props.id)}>{this.props.text}</h1>
                <img src="./img/x.png" className="todo-app__item-x" onClick={() => this.props.delete(this.props.id)}></img>
            </li>
        )
    }

}
export default Item;

//onClick={checkbox_click(id)