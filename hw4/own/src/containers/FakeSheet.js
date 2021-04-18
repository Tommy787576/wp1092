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
        if (event.target.tagName === "INPUT") {
            const [row, col] = event.target.id.split("_");
            const currInput = document.getElementById(row + "_" + col);
            switchBlock(row, col);

            currInput.select();

            if (row !== prevRow || col !== prevCol) {
                setPrevRow(row);
                setPrevCol(col);
            }
        }
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

    const handleAddAbove = () => {
        console.log("in");
        let copy = [...contentArray];
        let currNumRow = numRow;
        let currRow = prevRow + 1;

        console.log(copy[prevRow][prevCol]);
        // console.log(copy);
        copy.splice(prevRow, 0, Array(numCol).fill(""));
        console.log(copy);

        switchBlock(currRow, prevCol);
        setNumRow(currNumRow + 1);
        setContent(copy);
        setPrevRow(currRow);
    }

    const switchBlock = (row, col) => {
        const prevBlock = document.getElementById(prevRow + "_" + prevCol).parentNode;
        const prevRowBlock = document.getElementById(prevRow + "_0");
        const prevColBlock = document.getElementById("0_" + prevCol);
        const currBlock = document.getElementById(row + "_" + col).parentNode;
        const currRowBlock = document.getElementById(row + "_0");
        const currColBlock = document.getElementById("0_" + col);

        prevBlock.style.border = "";
        prevRowBlock.style.backgroundColor = "#fffafa";
        prevColBlock.style.backgroundColor = "#fffafa";

        currBlock.style.border = "2px solid blue";
        currRowBlock.style.backgroundColor = "#ece9e9";
        currColBlock.style.backgroundColor = "#ece9e9";
    }

    return (
        <>
            <div id="top-button">
                <button>+</button>
                <button>-</button>
            </div>
            <div id="main-content">
                <div id="left-button">
                    <button onClick={handleAddAbove}>+</button>
                    <button>-</button>
                </div>
                <table>
                    <thead>
                        <HeadIndex numCol={numCol} />
                    </thead>
                    <tbody>
                        <ContentTable
                            handleKeyDown={handleKeyDown}
                            handleClick={handleClick}
                            handleOnChange={handleOnChange}
                            numRow={numRow}
                            numCol={numCol}
                            contentArray={contentArray}
                        />
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FakeSheet;

