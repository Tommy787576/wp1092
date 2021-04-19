import React, { useState } from "react";
import ContentTable from "./ContentTable"
import HeadIndex from "../components/HeadIndex"

function FakeSheet() {
    const [numRow, setNumRow] = useState(100);
    const [numCol, setNumCol] = useState(26);
    const [prevRow, setPrevRow] = useState("0");
    const [prevCol, setPrevCol] = useState("0");
    const [contentArray, setContent] = useState([...Array(101)].map(() => Array(27).fill("")));

    const handleClick = (event) => {
        let col = "0";
        let row = "0";

        if (event.target.tagName === "INPUT") {
            [row, col] = event.target.id.split("_");
            const currInput = document.getElementById(row + "_" + col);
            switchBlock(row, col);

            currInput.select();

            if (row !== prevRow || col !== prevCol) {
                setPrevRow(row);
                setPrevCol(col);
            }
        }
        else {
            unFocusPrev(prevRow, prevCol);
            setPrevRow(row);
            setPrevCol(col);
        }

        console.log(row, col);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const [row, col] = [parseInt(prevRow), parseInt(prevCol)];

            if ((row + 1) <= numRow) {
                switchBlock('' + (row + 1), '' + col);
                setPrevRow('' + (row + 1));

                const currInput = document.getElementById((row + 1) + "_" + col);
                currInput.focus();
            }
        }
    }

    const handleOnChange = (event) => {
        const currInput = document.getElementById(prevRow + "_" + prevCol)
        let copy = [...contentArray];
        copy[prevRow][prevCol] = currInput.value;
        setContent(copy);
    }

    const handleAddRow = () => {
        let copy = [...contentArray];
        let currNumRow = numRow;

        let addRowIdx = (prevRow === "0" && prevCol === "0") ? (numRow + 1) : prevRow;

        copy.splice(addRowIdx, 0, Array(numCol).fill(""));
        setNumRow(currNumRow + 1);
        setContent(copy);
    }

    const handleDelRow = () => {
        if (prevRow !== "0" && prevCol !== "0") {
            let copy = [...contentArray];
            let currNumRow = numRow;

            copy.splice(prevRow, 1);
            setNumRow(currNumRow - 1);
            setContent(copy);
        }
    }

    const handleAddCol = () => {
        let copy = [...contentArray];
        let currNumCol = numCol;

        let addRowIdx = (prevRow === "0" && prevCol === "0") ? (numCol + 1) : prevCol;

        copy.forEach(row => {
            row.splice(addRowIdx, 0, "");
        })

        setNumCol(currNumCol + 1);
        setContent(copy);
    }

    const handleDelCol = () => {
        if (prevRow !== "0" && prevCol !== "0") {
            let copy = [...contentArray];
            let currNumCol = numCol;

            copy.forEach(row => {
                row.splice(prevCol, 1);
            })

            setNumCol(currNumCol - 1);
            setContent(copy);
        }
    }

    const switchBlock = (row, col) => {
        unFocusPrev(row, col);
        focusNext(row, col);
    }

    const unFocusPrev = (row, col) => {
        const prevBlock = document.getElementById(prevRow + "_" + prevCol).parentNode;
        const prevRowBlock = document.getElementById(prevRow + "_0");
        const prevColBlock = document.getElementById("0_" + prevCol);

        prevBlock.style.border = "";
        prevRowBlock.style.backgroundColor = "#fffafa";
        prevColBlock.style.backgroundColor = "#fffafa";
    }

    const focusNext = (row, col) => {
        const currBlock = document.getElementById(row + "_" + col).parentNode;
        const currRowBlock = document.getElementById(row + "_0");
        const currColBlock = document.getElementById("0_" + col);

        currBlock.style.border = "2px solid blue";
        currRowBlock.style.backgroundColor = "#ece9e9";
        currColBlock.style.backgroundColor = "#ece9e9";
    }

    return (
        <div id="outer-most" onClick={handleClick}>
            <div id="top-button">
                <button onClick={handleAddCol}>+</button>
                <button onClick={handleDelCol}>-</button>
            </div>
            <div id="main-content">
                <div id="left-button">
                    <button onClick={handleAddRow}>+</button>
                    <button onClick={handleDelRow}>-</button>
                </div>
                <table>
                    <thead>
                        <HeadIndex numCol={numCol} />
                    </thead>
                    <tbody>
                        <ContentTable
                            handleKeyDown={handleKeyDown}
                            handleOnChange={handleOnChange}
                            numRow={numRow}
                            numCol={numCol}
                            contentArray={contentArray}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FakeSheet;

