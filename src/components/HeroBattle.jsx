import React, { useState, useEffect, useReducer } from 'react';
import GameBoard from './GameBoard.jsx';
import SelectorTab from './SelectorTab.jsx'
import InfoTab from './InfoTab.jsx'

function HeroBattle () {
  const initialArmies = {
    player: {
    max: 0,
    units: []
    }, 
    enemy: {
      max: 0, 
      units:[]
    }
  }

  // function armyUpdate(state, action) {
  //   switch(action.type) {
  //     case 'Set max values':
  //       return {
  //         player: {
  //           max: state.player,
  //           units: armies.player.units
  //         },
  //         enemy: {
  //           max: state.enemy,
  //           units: armies.enemy.units
  //         }
  //       }
  //     case 'Player recruit':
  //       let playerArmy = armies.player.units;
  //       playerArmy.push(state)
  //       return {
  //         player: {
  //           max: armies.player.max,
  //           units: playerArmy
  //         },
  //         enemy: {
  //           max: armies.enemy.max,
  //           units: armies.enemy.units
  //         }
  //       }
  //     case 'Enemy recruit':
  //     let enemyArmy = armies.enemy.units;
  //     enemyArmy.push(state);
  //       return {
  //         player: {
  //           max: armies.player.max,
  //           units: armies.player.units
  //         },
  //         enemy: {
  //           max: armies.enemy.max,
  //           units: enemyArmy
  //         }
  //       }
  //     case 'Player death': {
  //       return {
  //         player: {
  //           max: armies.player.max,
  //           units: armies.player.units.splice(state.unit.armyNumber, 1)
  //         },
  //         enemy: {
  //           max: armies.enemy.max,
  //           units: armies.enemy.units
  //         }
  //       }
  //     }
  //     case 'Enemy death': {
  //       return {
  //         player: {
  //           max: state.player,
  //           units: armies.player.units
  //         },
  //         enemy: {
  //           max: state.enemy,
  //           units: armies.enemy.units.splice(state.unit.armyNumber, 1)
  //         }
  //       }
  //     }
  //   }
  // }

  const [prepPhase, updatePrep] = useState(0);
  const [battleTurn, changeTurn] = useState(0); //0 is player phase, 1 is enemy phase
  const [turnCount, setCount] = useState(0);
  // const [enemyArmy, recruitEnemy] = useState([]);
  // const [playerArmy, recruitPlayer] = useState([]);
  const [armies, updateArmies] = useState(initialArmies);
  // const [armies, dispatchArmy] = useReducer(armyUpdate, initialArmies)

  useEffect(() => {
    if (battleTurn === 1) {
      setCount(turnCount++);
    }
  }, [battleTurn])

  function changePrepPhase() {
    //0 - determine army sizes/ creating map/ show map info
    //1 - choose units/ place units/ show unit info
    //2 - game start.  player phase
    updatePrep(prepPhase + 1)
  }

  function addUnit(team, unit) { //0 is player, 1 is enemy
    console.log(armies, 'war!');
    let side;
    if (team) {
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
      <SelectorTab prepPhase={prepPhase} recruit={addUnit}/>
      <GameBoard prepPhase={prepPhase} changePrepPhase = {changePrepPhase}/>
      <InfoTab prepPhase={prepPhase}/>
    </div>
  )
}

export default HeroBattle;