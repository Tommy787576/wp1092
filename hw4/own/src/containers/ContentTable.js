import React, { useState } from "react";

function ContentTable(props) {
    const [prevRow, setPrevRow] = useState("0");
    const [prevCol, setPrevCol] = useState("0");
    const [clickTimes, setClickTimes] = useState(0);
    const [contentArray, setContent] = useState([...Array(101)].map(() => Array(27).fill("")));

    const focusIdx = (event) => {
        const [row, col] = event.target.id.split("_");
        const prevBlock = document.getElementById(prevRow + "_" + prevCol);
        const prevRowBlock = document.getElementById(prevRow + "_0");
        const prevColBlock = document.getElementById("0_" + prevCol);
        const currBlock = document.getElementById(row + "_" + col);
        const currRowBlock = document.getElementById(row + "_0");
        const currColBlock = document.getElementById("0_" + col);

        prevBlock.style.border = "";
        prevRowBlock.style.backgroundColor = "#fffafa";
        prevColBlock.style.backgroundColor = "#fffafa";

        currBlock.style.border = "2px solid blue";
        currRowBlock.style.backgroundColor = "#ece9e9";
        currColBlock.style.backgroundColor = "#ece9e9";

        if (row === prevRow && col === prevCol)
            setClickTimes(2);
        else
            setClickTimes(1);
        setPrevRow(row);
        setPrevCol(col);
    }

    const handleKeyDown = (event) => {
        if (clickTimes === 2) {
            const keyAscii = event.keyCode;
            const [row, col] = event.target.id.split("_");
            const currBlock = document.getElementById(row + "_" + col);

            if ((keyAscii >= 48 && keyAscii <= 57) ||
                (keyAscii >= 97 && keyAscii <= 122) ||
                (keyAscii >= 65 && keyAscii <= 90) ||
                (keyAscii === 8 || keyAscii === 46)) {
                let temp = "";

                if (currBlock.innerHTML) {
                    if (currBlock.innerText.charAt(currBlock.innerText.length - 1) === '|')
                        temp = currBlock.innerText.slice(0, -1);
                    else
                        temp = currBlock.innerText;
                    currBlock.innerHTML = "";
                    currBlock.innerText = "";
                }

                if (temp !== "" && (event.key === "Backspace" || event.key === "Delete"))
                    currBlock.innerText = temp.slice(0, -1);
                else if (!(event.key === "Backspace" || event.key === "Delete"))
                    currBlock.innerText = temp + event.key;
                contentArray[prevRow][prevCol] = currBlock.innerText;

                setContent(contentArray);
            }
            currBlock.innerHTML += "<span class='blinking-cursor'>|</span>"
        }
    }

    let rowIndex = Array.from({ length: props.numRow }, (_, i) => i + 1);
    let colIndex = Array.from({ length: props.numCol }, (_, i) => i + 1);
    let contentTable = rowIndex.map((idxRow) => {
        const contentRow = colIndex.map((idxCol) =>
            <td
                id={idxRow.toString() + "_" + idxCol.toString()}
                key={idxRow.toString() + "_" + idxCol.toString()}
                tabIndex="1"
                onClick={focusIdx}
                onKeyDown={handleKeyDown}
            >
                {contentArray[idxRow][idxCol]}
            </td>
        )

        return (
            <tr>
                <th
                    className="col"
                    id={idxRow.toString() + "_0"}
                    key={idxRow.toString() + "_0"}
                >{idxRow}</th>
                {contentRow}
            </tr>
        )
    })

    return contentTable;
}

export default ContentTable;