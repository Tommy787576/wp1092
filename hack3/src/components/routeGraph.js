import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data;
  const setCurr = props.setCurr;

  return (
    <div className="route-graph-container">
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
        data.map(station => <Station station={station} setCurr={setCurr} />)
      }
    </div>
  )
}

export default RouteGraph
