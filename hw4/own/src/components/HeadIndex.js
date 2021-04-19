import React from "react";

function HeadIndex(props) {
    let colIndex = Array.from({ length: props.numCol }, (_, number) => {
        let baseChar = ("A").charCodeAt(0),
            letters = "";

        number += 1;
        do {
            number -= 1;
            letters = String.fromCharCode(baseChar + (number % 26)) + letters;
            number = (number / 26) >> 0; // quick `floor`
        } while (number > 0);

        return letters;
    });
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