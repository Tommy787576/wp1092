import React, { Component } from "react";
import Header from "../components/Header";
import Item from "../components/Item";

class TodoApp extends Component {
    constructor(props){
        super(props);
        this.keying = this.keying.bind(this)
        this.display_list = this.display_list.bind(this)
        this.checkbox_click = this.checkbox_click.bind(this)
        this.item_detail_style = this.item_detail_style.bind(this)
        this.delete = this.delete.bind(this)
        this.Active_filter = this.Active_filter.bind(this)
        this.Completed_filter = this.Completed_filter.bind(this)
        this.All_filter = this.All_filter.bind(this)
        this.checkbox_checked = this.checkbox_checked.bind(this)
        this.delete_completed = this.delete_completed.bind(this)
        this.state = {
            hide_footer: true,
            index: [],
            id_cnt: 0,
            context: [],
            finished: [],
            filter: 'All'
        };
    }


    keying(text)  {
        if((text.key === 'Enter' || text.keyCode === 13) && text.target.value !== ''){
            let t = text.target.value
            const id = this.state.id_cnt
            const new_id_cnt = id+1
            this.setState(state => ({
                index: state.index.concat(id),
                id_cnt: new_id_cnt,
                context: state.context.concat(t),
                finished: state.finished.concat(false),
                hide_footer: false,
            }));
            text.target.value = '';
        }
    }

    display_list = () => {
        if (this.state.filter === 'Active'){
            var list = []
            for (let i = 0; i < this.state.index.length; i++){
                if (this.state.finished[i] === false){
                    list.push(<Item key={this.state.index[i]} id={this.state.index[i]} text={this.state.context[i]} checkbox_click={this.checkbox_click} item_detail_style={this.item_detail_style} delete={this.delete} checkbox_checked={this.checkbox_checked}/>)
                }
            }
            return list
        }
        else if (this.state.filter === 'Completed'){
            var list = []
            for (let i = 0; i < this.state.index.length; i++){
                if (this.state.finished[i] === true){
                    list.push(<Item key={this.state.index[i]} id={this.state.index[i]} text={this.state.context[i]} checkbox_click={this.checkbox_click} item_detail_style={this.item_detail_style} delete={this.delete} checkbox_checked={this.checkbox_checked}/>)
                }
            }
            return list
        }
        else{//filter === 'All'
            var list = []
            const todo = this.state.context
            for (let i = 0; i < this.state.context.length; i++){
                list.push(<Item key={this.state.index[i]} id={this.state.index[i]} text={todo[i]} checkbox_click={this.checkbox_click} item_detail_style={this.item_detail_style} delete={this.delete} checkbox_checked={this.checkbox_checked}/>)
            }
            return list
        }
        
    }

    checkbox_click = (id) => {
        let index = this.state.index.indexOf(id)
        let new_finished = [...this.state.finished]
        let tmp = new_finished[index]? false:true
        new_finished[index] = tmp
        this.setState(
            s => ({finished: new_finished })
        )
    }

    delete = (id) =>{
        let index = this.state.index.indexOf(id)
        let new_finished = [...this.state.finished]
        let new_context = [...this.state.context]
        let new_index = [...this.state.index]
        new_finished.splice(index, 1)
        new_context.splice(index, 1)
        new_index.splice(index, 1)
        const new_hide_footer = new_index.length>0? false:true
        this.setState({
            finished: new_finished,
            context: new_context,
            index: new_index,
            hide_footer: new_hide_footer
        })
    }

    item_detail_style = (id) =>{
        let index = this.state.index.indexOf(id)
        if (this.state.finished[index] === true){
            return ({textDecoration: 'line-through', opacity: '0.5'});
        }
        else{
            return ({});
        }
    }

    checkbox_checked = (id) =>{
        
        let index = this.state.index.indexOf(id)
        console.log("index", id)
        console.log("checked?", this.state.finished[index] === true? 'true':'false')
        return (this.state.finished[index] === true? true:false)
    }

    Active_filter(){
        this.setState({filter: 'Active'})
    }
    Completed_filter(){
        this.setState({filter: 'Completed'})
    }
    All_filter(){
        this.setState({filter: 'All'})
    }

    delete_completed(){
        let index_deleted = []
        for (let i = 0; i < this.state.index.length; i++){
            if(this.state.finished[i] === true){
                index_deleted.push(i)
            }
        }
        let new_index = [...this.state.index]
        let new_context = [...this.state.context]
        let new_finished = [...this.state.finished]
        for (let i=index_deleted.length-1; i >= 0; i--){
            new_index.splice(index_deleted[i], 1)
            new_context.splice(index_deleted[i], 1)
            new_finished.splice(index_deleted[i], 1)
        }
        const new_hide_footer = new_index.length>0? false:true
        this.setState({
            index: new_index, 
            context: new_context,
            finished: new_finished,
            hide_footer: new_hide_footer
        })
    }


    render() {
        let footer_visible = this.state.hide_footer? {visibility:'hidden'}:{visibility:'visible'};
        const finished_num = this.state.finished.reduce((total, currentValue) => total = total + currentValue,0);
        const unfinished_num = this.state.context.length - finished_num
        let clear_visible = finished_num>0? {visibility: 'visible'}:{visibility: 'hidden'}
        let display = this.display_list()
        let All_style = this.state.filter==='All'? {backgroundColor: 'rgb(233, 215, 222)'}:{backgroundColor: 'rgb(230, 230, 230)'}
        let Active_style = this.state.filter==='Active'? {backgroundColor: 'rgb(233, 215, 222)'}:{backgroundColor: 'rgb(230, 230, 230)'}
        let Completed_style = this.state.filter==='Completed'? {backgroundColor: 'rgb(233, 215, 222)'}:{backgroundColor: 'rgb(230, 230, 230)'}

        return (
            <>
                <Header text="todos" />

                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyUp={this.keying}></input>
                    <ul className="todo-app__list" id="todo-list">
                        {display}                        
                    </ul>
                </section>

                <footer className="todo-app__footer" id="todo-footer" style={footer_visible}>
                    <div className="todo-app__total">{unfinished_num} left</div>
                    <ul className="todo-app__view-buttons">
                        <button className="button" onClick={this.All_filter} style={All_style}>All</button>
                        <button className="button" onClick={this.Active_filter} style={Active_style}>Active</button>
                        <button className="button" onClick={this.Completed_filter} style={Completed_style}>Complete</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button style={clear_visible} onClick={this.delete_completed}>Clear completed</button>
                    </div>
                </footer>

            </>
        );
    }
}

export default TodoApp;
