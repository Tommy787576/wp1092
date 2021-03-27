import React, { Component } from "react";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.todoList = this.props.todoList;
    }
    handleClick(event) {
        let labelNode = event.target;
        let h1Node = event.target.parentNode.nextSibling;

        // toggle color of the label
        if (labelNode.style.background === "rgba(99, 99, 99, 0.698)"
            || !labelNode.style.background) {
            labelNode.style.background = "rgba(37, 211, 46, 0.698)";
            h1Node.style.textDecoration = "line-through";
            h1Node.style.opacity = 0.5;
        }
        else {
            labelNode.style.background = "rgba(99, 99, 99, 0.698)";
            h1Node.style.textDecoration = "";
            h1Node.style.opacity = "";
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
