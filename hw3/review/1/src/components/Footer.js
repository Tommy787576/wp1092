import React, { Component } from "react";
import Button from "../components/Button"

class Footer extends Component {
    render() {
        const todoThings = this.props.todoThings;
        const ChangeFilter = this.props.ChangeFilter;
        const Filter = this.props.Filter;
        let numLeft = 0; 
        let footerStyle = {display: "none"};
        let clearButtonStyle = {visibility: "hidden"}

        // 若有待辦事項，Footer才會顯示
        if (todoThings.length !== 0) {
            footerStyle = {display: "flex"};
        }

        // 計算未完成事項的數目
        for (let item of todoThings) {
            if (!item.completed) {
                numLeft++;
            }
            
            // 若有已完成的事項，顯示清除按鈕
            else {
                clearButtonStyle = {visibility: "visible"}
            }
        }
        return(
            <footer className="todo-app__footer" id="todo-footer" style={footerStyle}>
                <div className="todo-app__total">
                    {numLeft} left
                </div>
                <ul className="todo-app__view-buttons">
                    <li><Button text='All' onClick={ChangeFilter} Filter={Filter}/></li>
                    <li><Button text='Active' onClick={ChangeFilter}  Filter={Filter}/></li>
                    <li><Button text='Completed' onClick={ChangeFilter}  Filter={Filter}/></li>
                </ul>
                <div className="todo-app__clean">
                    <button style={clearButtonStyle} onClick={this.props.ClearCompleted}>
                        Clear completed
                    </button>
                </div>
            </footer>
        );
    }
}

export default Footer