import React, { useState, useEffect } from 'react';
import GridSquare from './GridSquare.jsx'

function MapColumn(props) {
  const { gameState, activeArmy, armies } = props
  return(
    <div className = "column">
      <GridSquare gameState={gameState} activeArmy={activeArmy} armies={armies}/>
      <GridSquare gameState={gameState} activeArmy={activeArmy} armies={armies}/>
      <GridSquare gameState={gameState} activeArmy={activeArmy} armies={armies}/>
      <GridSquare gameState={gameState} activeArmy={activeArmy} armies={armies}/>
      <GridSquare gameState={gameState} activeArmy={activeArmy} armies={armies}/>
      <GridSquare gameState={gameState} activeArmy={activeArmy} armies={armies}/>
      <GridSquare gameState={gameState} activeArmy={activeArmy} armies={armies}/>
      <GridSquare gameState={gameState} activeArmy={activeArmy} armies={armies}/>
    </div>
    
  )
}

export default MapColumn;