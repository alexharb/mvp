import React, { useState, useEffect } from 'react';
import GridSquare from './GridSquare.jsx'

function MapColumn(props) {
  return(
    <div className = "column">
      <GridSquare gameState={props.gameState}/>
      <GridSquare gameState={props.gameState}/>
      <GridSquare gameState={props.gameState}/>
      <GridSquare gameState={props.gameState}/>
      <GridSquare gameState={props.gameState}/>
      <GridSquare gameState={props.gameState}/>
      <GridSquare gameState={props.gameState}/>
      <GridSquare gameState={props.gameState}/>
    </div>
    
  )
}

export default MapColumn;