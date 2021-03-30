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
        this.setState(state => {
            let currList = state.todoList;
            currList.splice(idx, 1);
            return { todoList: currList, mode: state.mode };
        });
    }
    setIsFinished = (idx) => {
        this.setState(state => {
            let currList = state.todoList;
            currList[idx].isFinished = !currList[idx].isFinished;
            return { todoList: currList, mode: state.mode };
        });
    }
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const todoItem = event.target.value;

            this.setState(state => {
                let currList = state.todoList;
                const id = new Date().getTime();

                currList.push({ id, todoItem, isFinished: false });
                return { todoList: currList, mode: state.mode };
            });

            // reset to default value
            event.target.value = "";
            event.target.placeholder = "What needs to be done?";
        }
    }
    changeMode = (newMode) => {
        this.setState(state => ({ todoList: state.todoList, mode: newMode }));
    }
    deleteCompleted = () => {
        this.setState(state => {
            const currList = state.todoList;
            const newList = currList.filter(element => !element.isFinished);

            return { todoList: newList, mode: state.mode };
        });
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
