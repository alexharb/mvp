import React, { useState, useEffect } from 'react';
import GridSquare from './GridSquare.jsx'

function MapColumn(props) {
  const { gameState, activeArmy, armies, setup, totalMap, column, mapDispatch, changeTurnPhase, selectedUnit } = props
  return(
    <div className = "column">
    {setup.map((each, index) => {
      return <GridSquare key={index}
                         gameState={gameState} 
                         activeArmy={activeArmy} 
                         armies={armies} 
                         totalMap={totalMap}
                         column={column}
                         row={index}
                         mapDispatch={mapDispatch}
                         gridData={each}
                         changeTurnPhase={changeTurnPhase}
                         selectedUnit={selectedUnit}/>
    })}
    </div>
    
  )
}

export default MapColumn;