import React, { Component } from "react";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.todoList = this.props.todoList;
    }
    render() {
        return (
            this.todoList.map((element) =>
                <li key={element.id} className="todo-app__item">
                    <div className="todo-app__checkbox">
                        {/* <input id={element.id} /> */}
                        <label key={element.id} />
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
