import React, { Component } from "react";
import Header from "../components/Header";
import TodoList from "./TodoList";
import Footer from "../components/Footer";

class TodoApp extends Component {
    constructor() {
        super();
        this.state = { todoList: [] };
    }
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            let currList = this.state.todoList;
            const id = currList.length;
            const todoItem = event.target.value;

            currList.push({ id, todoItem });
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
                    <TodoList todoList={this.state.todoList} />
                </section>
                <Footer todoList={this.state.todoList} />
            </>
        );
    }
}

export default TodoApp;
