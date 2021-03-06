import React, { useState, useEffect } from 'react';
import GridSquare from './GridSquare.jsx'

function MapColumn(props) {
  const { gameState, activeArmy, armies, setup, totalMap, column, mapDispatch, changeTurnPhase } = props
  return(
    <div className = "column">
    {setup.map((each, index) => {
      return <GridSquare gameState={gameState} 
                         activeArmy={activeArmy} 
                         armies={armies} 
                         totalMap={totalMap}
                         column={column}
                         row={index}
                         mapDispatch={mapDispatch}
                         gridData={each}
                         changeTurnPhase={changeTurnPhase}/>
    })}
    </div>
    
  )
}

export default MapColumn;