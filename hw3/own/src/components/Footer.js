import React from "react";

const CountIsFinished = (list) => {
    let count = 0;

    for (let i = 0; i < list.length; i++) {
        if (!list[i].isFinished)
            count++;
    }

    return count;
}

const Footer = (props) => (
    props.todoList.length !== 0 &&
    <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">
            {CountIsFinished(props.todoList)} left
        </div>
        <ul className="todo-app__view-buttons">
            <li><button>All</button></li>
            <li><button>Active</button></li>
            <li><button>Completed</button></li>
        </ul>
        <div className="todo-app__clean">
            <button>
                Clear completed
            </button>
        </div>
    </footer>
)

export default Footer;