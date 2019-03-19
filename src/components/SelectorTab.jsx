import React, { useState, useEffect } from 'react';
import Unit from '../classes/Unit.js';
import UnitView from './UnitView.jsx';

function SelectorTab(props) {
  const { prepPhase, recruit, armies, toggleArmy, activeArmy, editArmyMax } = props
  const [armyCount, setArmyCount] = useState(0);

  function handleAdd() {
    let side = activeArmy === 1 ? 'enemy' : 'player'
    if (armies[side].units.length === armies[side].max) {
      alert(`The ${side}'s army already has ${armies[side].max} recruit(s).  Please remove a unit to add a new one.`);
    } else {
      let unit = new Unit();
      recruit(side, unit);
      setArmyCount(armyCount + 1)
    }
  }

  function handleSwap(event) {
    let target = event.target;
    if (target.value === 'player') {
      toggleArmy(0);
    } else {
      toggleArmy(1);
    }
  }

  return(
    <div id="selectorTab">
      {prepPhase === 0 &&
      <div>
      <label htmlFor="playerSize">Select the size of the player's army:</label><br></br>

      <select id="playerSize" name="player" onChange={editArmyMax}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select><br></br>
      <label htmlFor="enemySize">Select the size of the enemy's army:</label><br></br>

      <select id="enemySize" name="enemy" onChange={editArmyMax}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select><br></br>
      </div>
      }
      {[1, 2].includes(prepPhase) && 
        <div>
          <div>
            <input type="radio" value="player" name="starter" onChange={handleSwap}/>
            <label htmlFor="player">Player</label>
          </div>
          <div>
            <input type="radio" value="enemy" name="starter" onChange={handleSwap}/>
            <label htmlFor="enemy">Enemy</label>
          </div>
        </div>
      }

      {prepPhase === 1 && 
        <div>
        <select id="armySelector">
          <option value={0}>Player</option>
          <option value={1}>Enemy</option>
        </select><br></br>
  
        <select id="movementSelector">
          <option value={0}>Infantry</option>
          <option value={1}>Armor</option>
          <option value={2}>Flying</option>
          <option value={3}>Cavalier</option>
        </select><br></br>
  
        <select id="weaponSelector">
          <option value={0}>Sword</option>
          <option value={1}>Lance</option>
          <option value={2}>Axe</option>
          <option value={3}>Red Magic</option>
          <option value={4}>Blue Magic</option>
          <option value={5}>Green Magic</option>
          <option value={6}>Dagger</option>
          <option value={7}>Bow</option>
          <option value={8}>Dragon</option>
        </select><br></br>
        <button onClick={handleAdd}>Deploy</button>
        </div>
      }
      {armies.player.units.map((each) => {
        return <UnitView unit={each} team={'player'}/>
      })}
      {armies.enemy.units.map((each) => {
        return <UnitView unit={each} team={'enemy'}/>
      })}
    </div>
  )
}

export default SelectorTab;