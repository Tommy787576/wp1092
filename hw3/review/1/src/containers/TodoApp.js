import React, { Component } from "react";
import Header from "../components/Header";
import Section from "../components/Section"
import Footer from "../components/Footer"

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoThings: [], // 紀錄所有待辦事項
            Filter: 'All', // 目前的顯示狀態
        };
    }

    // 輸入事項後，更新state中的事項清單
    AddNewItem = (value) => {
        if (value.trim() !== "") {
            this.setState(state => ({
                todoThings: state.todoThings.concat({thing: value, completed: false})
            }))
        } 
    }

    // 按下叉叉後，刪除該事項
    DeleteItem = (index) => {
        this.setState(state => {
            state.todoThings.splice(index, 1);
            return state;
        })
    }

    // 切換事項的狀態(是否完成)
    ChangeStatus = (index) => {
        this.setState(state => {
            state.todoThings[index].completed = !state.todoThings[index].completed;
            return state;
        })
    }

    // 根據按鈕切換不同的顯示狀態
    ChangeFilter = (e) => {
        this.setState({
            Filter: e.target.value
        })
    }

    // 清除所有已完成的事項
    ClearCompleted = () => {
        let things = this.state.todoThings;
        let filter = this.state.Filter;
        let i = 0;
        while (i <= things.length) {
            while (things.length>0 && things[i].completed) {
                things.splice(i, 1);
                if (i >= things.length) {
                    break;
                }
            }
            ++i;
        }

        // 清除後若沒有待辦事項，將顯示狀態改為'All'，方便下次輸入時顯示事項
        if (things.length === 0) {
            filter = 'All';
        }
        this.setState(state => ({
            todoThings: things,
            Filter: filter
        }))
    }

    render() {
        return (
            <>
                <Header text="todos" />
                <Section todoThings={this.state.todoThings}
                        Filter={this.state.Filter} 
                        AddNewItem={this.AddNewItem} 
                        DeleteItem={this.DeleteItem}
                        ChangeStatus={this.ChangeStatus}/>
                <Footer todoThings={this.state.todoThings}
                        ChangeFilter={this.ChangeFilter}
                        ClearCompleted={this.ClearCompleted} 
                        Filter={this.state.Filter}/>
            </>
        );
    }
}

export default TodoApp;
