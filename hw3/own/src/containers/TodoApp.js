import React, { Component } from "react";
import Header from "../components/Header";
import TodoList from "./TodoList";
import Footer from "./Footer";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = { todoList: [], mode: "All" };
    }
    deleteItem = (idx) => {
        let currList = this.state.todoList;
        const mode = this.state.mode;

        currList.splice(idx, 1);
        this.setState({ todoList: currList, mode });
    }
    setIsFinished = (idx) => {
        let currList = this.state.todoList;
        const mode = this.state.mode;

        currList[idx].isFinished = !currList[idx].isFinished;
        this.setState({ todoList: currList, mode });
    }
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            let currList = this.state.todoList;
            const mode = this.state.mode;
            const id = new Date().getTime();
            const todoItem = event.target.value;

            currList.push({ id, todoItem, isFinished: false });
            this.setState({ todoList: currList, mode });

            // reset to default value
            event.target.value = "";
            event.target.placeholder = "What needs to be done?";
        }
    }
    changeMode = (newMode) => {
        const currList = this.state.todoList;

        this.setState({ todoList: currList, mode: newMode });
    }
    deleteCompleted = () => {
        const mode = this.state.mode;
        const currList = this.state.todoList;
        const newList = currList.filter(element => !element.isFinished);

        this.setState({ todoList: newList, mode });
    }
    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyDown={this.handleKeyDown} />
                    <TodoList mode={this.state.mode} todoList={this.state.todoList} setIsFinished={this.setIsFinished} deleteItem={this.deleteItem} />
                </section>
                <Footer todoList={this.state.todoList} mode={this.state.mode} changeMode={this.changeMode} deleteCompleted={this.deleteCompleted} />
            </>
        );
    }
}

export default TodoApp;
