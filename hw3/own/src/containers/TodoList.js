import React, { Component } from "react";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.todoList = this.props.todoList;
        this.setIsFinished = this.props.setIsFinished;
    }
    handleClick = (event) => {
        let labelNode = event.target;
        let h1Node = event.target.parentNode.nextSibling;

        const labelNodeId = parseInt(labelNode.id);
        let foundIdx = -1;
        for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].id === labelNodeId) {
                foundIdx = i;
                break;
            }
        }

        // toggle color of the label
        if (foundIdx !== -1) {
            if (!this.todoList[foundIdx].isFinished) {
                labelNode.style.background = "rgba(37, 211, 46, 0.698)";
                h1Node.style.textDecoration = "line-through";
                h1Node.style.opacity = 0.5;
                this.setIsFinished(foundIdx);
            }
            else {
                labelNode.style.background = "rgba(99, 99, 99, 0.698)";
                h1Node.style.textDecoration = "";
                h1Node.style.opacity = "";
                this.setIsFinished(foundIdx);
            }
        }
    }
    render() {
        return (
            this.todoList.map((element) =>
                <li key={element.id} className="todo-app__item">
                    <div className="todo-app__checkbox" onClick={this.handleClick}>
                        <label key={element.id} id={element.id} />
                    </div>
                    <h1 className="todo-app__item-detail">
                        {element.todoItem}
                    </h1>
                    <img src="./img/x.png" className="todo-app__item-x" alt="cross"></img>
                </li>
            )
        )
    }
}

export default TodoList;