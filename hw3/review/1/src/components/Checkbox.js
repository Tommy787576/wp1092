import React from 'react'
export default ({index, checked, ChangeStatus}) => {
    return <div className="todo-app__checkbox">
                <input type='checkbox' checked={checked} id={index} onClick={() => ChangeStatus(index)}/>
                <label htmlFor={index}/>
            </div>
}