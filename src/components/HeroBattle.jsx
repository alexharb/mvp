import React, { useState, useEffect, useReducer } from 'react';
import GameBoard from './GameBoard.jsx';
import SelectorTab from './SelectorTab.jsx'
import InfoTab from './InfoTab.jsx'

function HeroBattle () {
  const initialArmies = {
    player: {
    max: 1,
    units: []
    }, 
    enemy: {
      max: 1, 
      units:[]
    }
  }

  const [prepPhase, updatePrep] = useState(0);
  const [battleTurn, changeTurn] = useState(0); //0 is player phase, 1 is enemy phase
  const [turnCount, setCount] = useState(0);
  const [armies, updateArmies] = useState(initialArmies);

  useEffect(() => {
    if (battleTurn === 1) {
      setCount(turnCount++);
    }
  }, [battleTurn])

  function changePrepPhase() {
    //0 - determine army sizes/ creating map/ show map info
    //1 - choose units/ // show unit info
    //2 - place your units
    //3 - game start.  player phase begins
    if (prepPhase < 3) {
      updatePrep(prepPhase + 1)
    }
  }

  useEffect(() => {
    console.log('hey');
  }, [armies])

  function addUnit(team, unit) { //0 is player, 1 is enemy
    let side;
    if (team === '1') {
      side = 'enemy';
    } else {
      side = 'player';
    }
      let newTeam = armies[side].units
      newTeam.push(unit);
      let newArmies = armies;
      newArmies[side].units = newTeam;
      updateArmies(newArmies);
  }

  return(
    <div id="main">
      <SelectorTab prepPhase={prepPhase} recruit={addUnit} armies={armies}/>
      <GameBoard prepPhase={prepPhase} changePrepPhase = {changePrepPhase}/>
      <InfoTab prepPhase={prepPhase}/>
    </div>
  )
}

export default HeroBattle;