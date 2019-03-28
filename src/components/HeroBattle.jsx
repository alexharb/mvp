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

  let initialMap = [
    [1, 0, 4, 0, 0, 0, 0, 1],
    [0, 0, 4, 1, 0, 3, 0, 0],
    [0, 0, 0, 2, 2, 1, 0, 0],
    [0, 0, 1, 2, 2, 0, 0, 1],
    [1, 0, 5, 0, 4, 0, 0, 0],
    [1, 0, 3, 0, 0, 3, 0, 1],
  ].map((each) => {
    return each.map((each2) => {
      return {terrain: each2,
              hasUnit: false,
              unitPlaced: {},
              canMove: false,
              isStarter: false}
    })
  });

  function mapUpdate(state, action) {
    let oldMap = state;
    const { column, row, type, terrain, unit } = action;
    switch (type) {
      case 'terrain':
        oldMap[column][row].terrain = terrain;
        return oldMap;
      case 'placeUnit':

      case 'moveUnit':
        oldMap[unit.column][unit.row].isStarter = false;
        oldMap[unit.column][unit.row].unitPlaced = {};
        unit.column = column;
        unit.row = row;
        oldMap[column][row].unitPlaced = unit;
        oldMap[column][row].isStarter = true;
        console.log(oldMap);
        return oldMap;
      case 'canMove':
        oldMap[column][row].canMove = true;
        return oldMap;
        // console.log('newMap');
        // return newMap;
      case 'removeMove':
        oldMap[column][row].canMove = false;
        return oldMap;
      default:
    }
  }

  const [prepPhase, updatePrep] = useState(0);
  const [battleTurn, changeTurn] = useState(0); //0 is player phase, 1 is enemy phase
  const [turnCount, setCount] = useState(0);
  const [armies, updateArmies] = useState(initialArmies);
  const [layout, mapDispatch] = useReducer(mapUpdate, initialMap);
  const [battleStart, updateStart] = useState(false);
  const [turnPhase, updateTurnPhase] = useState(0) //0 is needs to select, 1 is selected, ready to move, 2 is attacking

  useEffect(() => {
    if (battleTurn === 1) {
      setCount(turnCount + 1);
    }
  }, [battleTurn])

  function changePrepPhase() {
    //0 - determine army sizes/ creating map/ show map info
    //1 - choose units/ // show unit info
    //2 - place units
    if (prepPhase < 3) {
      updatePrep(prepPhase + 1)
      changeTurn(0);
      if (prepPhase === 2) {
        updateStart(true);
      }
    } else {
      let newArmy = battleTurn === 1 ? 0 : 1;
      changeTurn(newArmy);
    }
  };

  function changeTurnPhase(type) {
    switch(type) {
      case 'move':
        updateTurnPhase('move');
        return;
      case 'attack':
        updateTurnPhase('attack');
        return;
      default:
        updateTurnPhase('default');
        return;
    }
  }

  function addUnit(team, unit) { //0 is player, 1 is enemy
    let newTeam = armies[team].units;
    let movType = ['Infantry', 'Armor', 'Flying', 'Cavalier'];
    let weapType=['Sword', 'Lance', 'Axe', 'Magic', 'Dagger', 'Bow', 'Dragon'];
    let weapColor=['Red', 'Blue', 'Green', 'Colorless'];
    let title = `${movType[unit.type]} ${unit.weapon.type > 2 ? weapColor[unit.weapon.color] : ''} ${weapType[unit.weapon.type]}`;
    let labelNum = 1;
    newTeam.forEach((each) => {
      if (each.title.includes(title)) {
        labelNum++;
      }
    });
    unit.title = `${title} ${labelNum}`;
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
                 armies={armies}
                 setup={layout}
                 mapDispatch={mapDispatch}
                 changeTurnPhase={changeTurnPhase}/>
      <InfoTab prepPhase={prepPhase}/>
    </div>
  )
}

export default HeroBattle;