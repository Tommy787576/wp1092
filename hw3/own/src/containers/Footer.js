import React, { Component } from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.changeMode = this.props.changeMode;
    }
    countLeft = (list) => {
        let count = 0;

        for (let i = 0; i < list.length; i++) {
            if (!list[i].isFinished)
                count++;
        }

        return count;
    }
    handleMode = (event) => {
        const mode = event.target.id;

        this.changeMode(mode);
    }
    render() {
        const colorAll = (this.props.mode === "All") ? { backgroundColor: "rgba(153, 153, 153, 0.521)" } : { backgroundColor: "transparent" };
        const colorActive = (this.props.mode === "Active") ? { backgroundColor: "rgba(153, 153, 153, 0.521)" } : { backgroundColor: "transparent" };
        const colorCompleted = (this.props.mode === "Completed") ? { backgroundColor: "rgba(153, 153, 153, 0.521)" } : { backgroundColor: "transparent" };
        const isLeftNum = this.countLeft(this.props.todoList);
        const isFinishedNum = this.props.todoList.length - isLeftNum;

        return (
            this.props.todoList.length !== 0 &&
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">
                    {isLeftNum} left
            </div>
                <ul className="todo-app__view-buttons">
                    <button id="All" style={colorAll} onClick={this.handleMode}>All</button>
                    <button id="Active" style={colorActive} onClick={this.handleMode}>Active</button>
                    <button id="Completed" style={colorCompleted} onClick={this.handleMode}>Completed</button>
                </ul>
                <div className="todo-app__clean">
                    <button style={{ visibility: isFinishedNum === 0 && "hidden" }} onClick={this.props.deleteCompleted}>
                        Clear completed
                    </button>
                </div>
            </footer>
        )
    }
}

export default Footer;