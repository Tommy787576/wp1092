import React from "react";

function ContentTable(props) {
    const { handleKeyDown, handleOnChange, numRow, numCol, contentArray } = props;
    let rowIndex = Array.from({ length: numRow }, (_, i) => i + 1);
    let colIndex = Array.from({ length: numCol }, (_, i) => i + 1);

    let contentTable = rowIndex.map((idxRow) => {
        const contentRow = colIndex.map((idxCol) =>
            <td
                key={idxRow.toString() + "_" + idxCol.toString()}
            >
                <input
                    id={idxRow.toString() + "_" + idxCol.toString()}
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChange}
                    value={contentArray[idxRow][idxCol]}
                ></input>
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