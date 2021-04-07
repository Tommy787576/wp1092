import React, { Component } from "react";
import Checkbox from '../components/Checkbox'

class Input extends Component {
    handleKeyDown = (e) => {
        // 按下Enter後，更新清單
        if (e.key ==='Enter') {
            this.props.AddNewItem(e.target.value);
            e.target.value = "";
        }
    }
    render() {
        const value = this.props.value
        return (
            <input className="todo-app__input" 
                    placeholder={value} 
                    onKeyDown={this.handleKeyDown}/>
        );
    }
}

class TodoList extends Component {
    render() {
        const todoThings = this.props.todoThings;
        return (
            <ul className="todo-app__list" id="todo-list">
                {todoThings.map((e,index) => 
                    <TodoItem todoItem={e} 
                                index={index} 
                                Filter={this.props.Filter} 
                                DeleteItem={this.props.DeleteItem}
                                ChangeStatus={this.props.ChangeStatus}/>)}
            </ul>
        );
    }
}

class TodoItem extends Component {
    render() {
        const todoItem = this.props.todoItem.thing;
        const completed = this.props.todoItem.completed;
        const index = this.props.index;
        const filter = this.props.Filter;
        let style = {};
        let checked = false;

        // 若事項的完成情況不符目前的顯示狀態，就直接回傳空element
        if (filter === 'Active') {
            if (completed) {
                return(<></>);
            }
        }
        else if (filter === 'Completed') {
            if (!completed) {
                return (<></>);
            }
        }

        // 若事項已完成，改變字的style
        if (completed) {
            style = {textDecoration: "line-through", opacity: 0.5};
            checked = true;
        }
        return (
            <li className="todo-app__item">
                <Checkbox index={index} checked={checked} ChangeStatus={this.props.ChangeStatus}/>
                <h1 style={style} className="todo-app__item-detail">
                    {todoItem}
                </h1>
                <img src="./img/x.png" 
                    className="todo-app__item-x" 
                    onClick={() => this.props.DeleteItem(index)}/>
            </li>
        );
    }
}

class Section extends Component {
    render() {
        const input_value = "What needs to be done?";
        return (
            <section className="todo-app__main">
                <Input value={input_value} AddNewItem={this.props.AddNewItem}/>
                <TodoList todoThings={this.props.todoThings} 
                        Filter={this.props.Filter} 
                        DeleteItem={this.props.DeleteItem} 
                        ChangeStatus={this.props.ChangeStatus}/>
            </section>
        );
    }
}

export default Section