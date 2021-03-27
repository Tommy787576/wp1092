import React, { Component } from "react";
import Header from "../components/Header";
import TodoList from "./TodoList";
import Footer from "../components/Footer";

class TodoApp extends Component {
    constructor() {
        super();
        this.state = { todoList: [] };
    }
    setIsFinished = (idx) => {
        let currList = this.state.todoList;

        currList[idx].isFinished = !currList[idx].isFinished;
        this.setState({ todoList: currList });
    }
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            let currList = this.state.todoList;
            const id = new Date().getTime();
            const todoItem = event.target.value;

            currList.push({ id, todoItem, isFinished: false });
            this.setState({ todoList: currList });

            // reset to default value
            event.target.value = "";
            event.target.placeholder = "What needs to be done?";
        }
    }
    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyDown={this.handleKeyDown} />
                    <TodoList todoList={this.state.todoList} setIsFinished={this.setIsFinished} />
                </section>
                <Footer todoList={this.state.todoList} />
            </>
        );
    }
}

export default TodoApp;
