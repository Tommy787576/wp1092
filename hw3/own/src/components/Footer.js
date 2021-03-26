import React from "react";

const Footer = (props) => (
    props.todoList.length !== 0 &&
    <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">
            {props.todoList.length} left
        </div>
        <ul className="todo-app__view-buttons">
            <li><button>All</button></li>
            <li><button>Active</button></li>
            <li><button>Completed</button></li>
        </ul>
        <div class="todo-app__clean">
            <button>
                Clear completed
            </button>
        </div>
    </footer>
)

export default Footer;