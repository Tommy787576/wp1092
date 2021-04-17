import React from "react";

function HeadIndex(props) {
    let colIndex = Array.from({ length: props.numCol }, (_, i) => String.fromCharCode(65 + i));
    let headIndex = colIndex.map((element, idx) =>
        <th
            className="row"
            id={"0_" + (idx + 1).toString()}
            key={"0_" + (idx + 1).toString()}
        >{element}</th>
    )

    return (
        <tr>
            <th
                className="left-top-block"
                id="0_0"
                key="0_0"
            ></th>
            {headIndex}
        </tr>
    )
}

export default HeadIndex;