import React, { useState, useEffect } from 'react';
import MapColumn from './MapColumn.jsx';


function GameBoard(props) {
  const { prepPhase, changePrepPhase, activeArmy, armies } = props

  return(
  <div id="gameBoard">
    <div id="map">
      <MapColumn gameState={prepPhase} activeArmy={activeArmy} armies={armies}/>
      <MapColumn gameState={prepPhase} activeArmy={activeArmy} armies={armies}/>
      <MapColumn gameState={prepPhase} activeArmy={activeArmy} armies={armies}/>
      <MapColumn gameState={prepPhase} activeArmy={activeArmy} armies={armies}/>
      <MapColumn gameState={prepPhase} activeArmy={activeArmy} armies={armies}/>
      <MapColumn gameState={prepPhase} activeArmy={activeArmy} armies={armies}/>
    </div>
    <div id="options"></div>
    <button id="startButton" onClick={changePrepPhase}>
    {prepPhase === 0 && `Finalize the map!`}
    {prepPhase === 1 && `Submit your units!`}
    {prepPhase === 2 && `Select your starting positions!`}
    {prepPhase === 3 && `Start the match!`}
    </button>
  </div>
  )
}

export default GameBoard;