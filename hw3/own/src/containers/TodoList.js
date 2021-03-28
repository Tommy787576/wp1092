import React, { Component } from "react";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.setIsFinished = this.props.setIsFinished;
        this.deleteItem = this.props.deleteItem;
    }
    handleClick = (event) => {
        let labelNode = event.target;
        const labelNodeId = parseInt(labelNode.id);
        const foundIdx = this.props.todoList.findIndex((element) => element.id === labelNodeId);

        // toggle color of the label
        if (foundIdx !== -1) {
            this.setIsFinished(foundIdx);
        }
    }
    handleDelete = (event) => {
        const labelNode = event.target.previousSibling.previousSibling.childNodes[0];
        const id = parseInt(labelNode.id);
        const idx = this.props.todoList.findIndex((element) => element.id === id);

        this.deleteItem(idx);
    }
    render() {
        return (
            this.props.todoList.map((element) => {
                if (this.props.mode === "Active" && element.isFinished)
                    return (null);
                else if (this.props.mode === "Completed" && !element.isFinished)
                    return (null);
                else {
                    const labelStyle = element.isFinished ? { background: "rgba(37, 211, 46, 0.698)" } : { background: "rgba(99, 99, 99, 0.698)" };
                    const h1Style = element.isFinished ? { textDecoration: "line-through", opacity: 0.5 } : { textDecoration: "", opacity: "" };

                    return (
                        <li key={element.id} className="todo-app__item">
                            <div className="todo-app__checkbox" onClick={this.handleClick}>
                                <label key={element.id} id={element.id} style={labelStyle} />
                            </div>
                            <h1 className="todo-app__item-detail" style={h1Style}>
                                {element.todoItem}
                            </h1>
                            <img src="./img/x.png" className="todo-app__item-x" alt="cross" onClick={this.handleDelete}></img>
                        </li>
                    )
                }
            })
        )
    }
}

export default TodoList;
