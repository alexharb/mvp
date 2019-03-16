import React, { useState, useEffect } from 'react';
import MapColumn from './MapColumn.jsx';

function BattleMap () {
  const [gameState, setGame] = useState(false)

  function startGame() {
    setGame(true);
  }

  return(
    <div id="gameBoard">
      <div id="map">
        <MapColumn gameState={gameState}/>
        <MapColumn gameState={gameState}/>
        <MapColumn gameState={gameState}/>
        <MapColumn gameState={gameState}/>
        <MapColumn gameState={gameState}/>
        <MapColumn gameState={gameState}/>
      </div>
      <div id="options"></div>
      <button id="startButton" onClick={startGame}>Start the match!</button>
    </div>
  )
}

export default BattleMap;