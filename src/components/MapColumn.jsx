import React, { useState, useEffect } from 'react';
import GridSquare from './GridSquare.jsx'

function MapColumn(props) {
  const { gameState, activeArmy, armies, setup, totalMap, column } = props
  return(
    <div className = "column">
    {setup.map((each, index) => {
      return <GridSquare gameState={gameState} 
                         activeArmy={activeArmy} 
                         armies={armies} 
                         initTerrain={each}
                         totalMap={totalMap}
                         column={column}
                         row={index}/>
    })}
    </div>
    
  )
}

export default MapColumn;