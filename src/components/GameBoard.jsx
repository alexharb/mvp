import React, { useState, useEffect } from 'react';
import MapColumn from './MapColumn.jsx';


function GameBoard(props) {
  const { prepPhase, changePrepPhase, activeArmy, armies, setup, mapDispatch } = props
  const army = activeArmy === 1 ? 'enemy' : 'player';

  function stringToUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return(
  <div id="gameBoard">
    <div id="map">
    {setup.map((each, index) => {
      return <MapColumn gameState={prepPhase} 
                        activeArmy={activeArmy} 
                        armies={armies} 
                        setup={each} 
                        totalMap={setup}
                        column={index}
                        mapDispatch={mapDispatch}/>
    })}
    </div>
    <div id="options"></div>
    {stringToUpperCase(army)}'s phase
    <button id="startButton" onClick={changePrepPhase}>
    {prepPhase === 0 && `Finalize the map!`}
    {prepPhase === 1 && `Submit your units!`}
    {prepPhase === 2 && `Start the match!`}
    {prepPhase > 2 && `End ${army}'s Turn`}
    </button>
  </div>
  )
}

export default GameBoard;