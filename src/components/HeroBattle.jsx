import React, { useState, useEffect, useReducer } from 'react';
import GameBoard from './GameBoard.jsx';
import SelectorTab from './SelectorTab.jsx'
import InfoTab from './InfoTab.jsx'

function HeroBattle () {
  const initialArmies = {
    player: {
    max: 1,
    placedUnits: 0, 
    units: []
    }, 
    enemy: {
      max: 1, 
      placedUnits: 0,
      units:[]
    }
  }

  const [prepPhase, updatePrep] = useState(0);
  const [battleTurn, changeTurn] = useState(0); //0 is player phase, 1 is enemy phase
  // const [turnCount, setCount] = useState(0);
  const [armies, updateArmies] = useState(initialArmies);

  // useEffect(() => {
  //   if (battleTurn === 1) {
  //     setCount(turnCount + 1);
  //   }
  // }, [battleTurn])

  function changePrepPhase() {
    //0 - determine army sizes/ creating map/ show map info
    //1 - choose units/ // show unit info
    //2 - Select your units
    //3 - place enemy units
    if (prepPhase < 4) {
      updatePrep(prepPhase + 1)
    }
  }

  useEffect(() => {
  }, [armies])

  function armyUnitCount(element, label) {
    
  }

  function addUnit(team, unit) { //0 is player, 1 is enemy
    let newTeam = armies[team].units
    let movType = ['Infantry', 'Armor', 'Flying', 'Cavalier']
    let weapType=['Sword', 'Lance', 'Axe', 'Red Magic', 'Blue Magic', 'Green Magic', 'Dagger', 'Bow', 'Dragon']
    let title = `${movType[unit.type]} ${weapType[unit.weapon.type]}`
    let labelNum = 1;
    newTeam.forEach((each) => {
      if (each.title.includes(title)) {
        labelNum++;
      }
    });
    unit.title = `${title} ${labelNum}`
    newTeam.push(unit);
    let newArmies = armies;
    newArmies[team].units = newTeam;
    updateArmies(newArmies);
  }

  function toggleArmy(team) {
    changeTurn(team);
  }

  function editArmyMax(event) {
    let army = event.target.name;
    let num = Number(event.target.value);
    let newArmies = armies;
    newArmies[army].max = num;
  }

  return(
    <div id="main">
      <SelectorTab prepPhase={prepPhase}
                   recruit={addUnit}
                   armies={armies}
                   toggleArmy={toggleArmy}
                   activeArmy={battleTurn}
                   editArmyMax={editArmyMax}/>
      <GameBoard prepPhase={prepPhase} 
                 changePrepPhase={changePrepPhase} 
                 activeArmy={battleTurn}
                 armies={armies}/>
      <InfoTab prepPhase={prepPhase}/>
    </div>
  )
}

export default HeroBattle;