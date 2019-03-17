import React, { useState, useEffect } from 'react';
import MapColumn from './MapColumn.jsx';


function GameBoard(props) {
  const [gameState, setGame] = useState(false)

  function startGame() {
    setGame(true);
  }

  return(
  <div id="gameBoard">
    <div id="map">
      <MapColumn gameState={props.prepPhase}/>
      <MapColumn gameState={props.prepPhase}/>
      <MapColumn gameState={props.prepPhase}/>
      <MapColumn gameState={props.prepPhase}/>
      <MapColumn gameState={props.prepPhase}/>
      <MapColumn gameState={props.prepPhase}/>
    </div>
    <div id="options"></div>
    <button id="startButton" onClick={props.changePrepPhase}>Start the match!</button>
  </div>
  )
}

export default GameBoard;