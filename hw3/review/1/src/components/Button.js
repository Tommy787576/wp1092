import React from 'react'
export default ({text, onClick, Filter}) => {
    let style = {};

    // 根據目前的顯示狀態，將對應的按鈕加上邊框
    if (Filter == text) {
        style = {border: "2px solid gray"};
    }
    return <button value={text} onClick={onClick} style={style}>
        {text}
    </button>;
}