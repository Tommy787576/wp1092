import React from 'react'

function Station(props) {
  const data = props.station;

  const getRectClassName = () => {
    let nameClass = "station-rectangle";

    if (data.station_type === 'R')
      nameClass += " red";
    else if (data.station_type === 'G')
      nameClass += " green";
    else if (data.station_type === 'B')
      nameClass += " blue";
    else
      nameClass += " orange";

    if (data.station_order === 1 || data.distance_to_next === -1)
      nameClass += " end";

    return nameClass;
  }

  const getLineClassName = () => {
    let nameClass = "line";

    if (data.station_type === 'R')
      nameClass += " red";
    else if (data.station_type === 'G')
      nameClass += " green";
    else if (data.station_type === 'B')
      nameClass += " blue";
    else
      nameClass += " orange";

    return nameClass;
  }

  return (
    <div className="station-line-container">
      <div id={`s-${data.station_id}`} className="station-and-name" onClick={props.setCurr}> {/* you should add both id and onClick to attributes */}
        <div className={getRectClassName()}>{data.station_id}</div>
        <div className="station-name">{data.station_name}</div>
      </div>
      {data.distance_to_next !== -1 &&
        <div id={`l-${data.station_id}`} className={getLineClassName()}></div>} {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
