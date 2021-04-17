import React, { useState } from "react";

function ContentTable(props) {
    const [prevRow, setPrevRow] = useState("0");
    const [prevCol, setPrevCol] = useState("0");

    const focusIdx = (event) => {
        const [row, col] = event.target.id.split("_");
        const prevRowBlock = document.getElementById(prevRow + "_0");
        const prevColBlock = document.getElementById("0_" + prevCol);
        const currRowBlock = document.getElementById(row + "_0");
        const currColBlock = document.getElementById("0_" + col);

        prevRowBlock.style.backgroundColor = "#fffafa";
        prevColBlock.style.backgroundColor = "#fffafa";
        currRowBlock.style.backgroundColor = "#ece9e9";
        currColBlock.style.backgroundColor = "#ece9e9";

        setPrevRow(row);
        setPrevCol(col);
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
            ></td>
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