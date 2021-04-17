import React from "react";
import ContentTable from "./ContentTable"
import HeadIndex from "../components/HeadIndex"

let numRow = 100;
let numCol = 26;

function FakeSheet() {
    return (
        <>
            <div id="top-button">
                <button>+</button>
                <button>-</button>
            </div>
            <div id="main-content">
                <div id="left-button">
                    <button>+</button>
                    <button>-</button>
                </div>
                <table>
                    <thead>
                        <HeadIndex numCol={numCol} />
                    </thead>
                    <tbody>
                        <ContentTable numRow={numRow} numCol={numCol} />
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FakeSheet;

