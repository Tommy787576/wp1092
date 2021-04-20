export default function Grid(props) {
    const colIndex = Array.from({ length: 4 }, (_, i) => i);
    const mapping = {
        '': "", 2: "NCTU", 4: "NYMU", 8: "NTU",
        16: "UCSD", 32: "UBC", 64: "CUHK", 128: "UCLA",
        256: "NYU", 512: "UCB", 1024: "HKUST", 2048: "UTokyo",
        4096: "Columbia", 8192: "Yale", 16384: "Cambridge",
        32768: "Stanford", 65536: "MIT"
    }

    let rowHtml = colIndex.map((colId) => {
        const grid_id = `grid-${props.rowIdx}-${colId}`;
        const value_id = `value-${props.rowIdx}-${colId}`;
        const value = (props.rowVal[colId] === 0) ? "" : mapping[props.rowVal[colId]];
        const temp_class_name = (props.rowVal[colId] === 0) ?
            'grid' : 'grid' + ` level-${props.rowVal[colId]}`;

        return (
            <td>
                <div className={temp_class_name} id={grid_id}>
                    <div className="school-name" id={value_id}>{value}</div>
                </div>
            </td>
        )
    })

    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################

    return rowHtml;
}