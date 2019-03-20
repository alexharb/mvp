import React, { useState, useEffect } from 'react';
import GridSquare from './GridSquare.jsx'

function MapColumn(props) {
  const { gameState, activeArmy, armies, setup, totalMap, column, mapDispatch } = props
  return(
    <div className = "column">
    {setup.map((each, index) => {
      return <GridSquare gameState={gameState} 
                         activeArmy={activeArmy} 
                         armies={armies} 
                         initTerrain={each.terrain}
                         totalMap={totalMap}
                         column={column}
                         row={index}
                         mapDispatch={mapDispatch}/>
    })}
    </div>
    
  )
}

export default MapColumn;