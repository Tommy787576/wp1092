import React from "react";

const Header = (props) => (
    <header className="todo-app__header">
        <h1 className="todo-app__title">{props.text}</h1>
    </header>
)

export default Header;